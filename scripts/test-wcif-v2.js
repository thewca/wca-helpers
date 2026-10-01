const assert = require('assert').strict;
const Ajv = require('ajv');
const { mkdtempSync, readFileSync, rmSync, writeFileSync } = require('fs');
const { tmpdir } = require('os');
const path = require('path');
const ts = require('typescript');

require('ts-node/register');

const repositoryRoot = path.resolve(__dirname, '..');
const schemaPath = path.join(
  repositoryRoot,
  'spec',
  'fixtures',
  'wcif-2.1.1.schema.json',
);
const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
const { competition } = require('../spec/wcif2.type-test');
const temporaryDirectory = mkdtempSync(path.join(tmpdir(), 'wca-helpers-'));
const typeTestPath = path.join(temporaryDirectory, 'wcif-v2.type-test.ts');

function nonNullSchema(schemas) {
  return (
    schemas.find((schemaOption) => schemaOption.type !== 'null') || schemas[0]
  );
}

function schemaSample(schemaNode, schemaPathParts, eventIds) {
  if (schemaNode.$ref === 'activity') {
    return {
      id: 1,
      name: 'example',
      activityCode: 'example',
      startTime: 'example',
      endTime: 'example',
      childActivities: [],
      scrambleSetId: null,
      extensions: [],
    };
  }
  if (schemaNode.const !== undefined) return schemaNode.const;
  if (schemaNode.enum) return schemaNode.enum[0];
  if (schemaNode.oneOf) {
    return schemaSample(
      nonNullSchema(schemaNode.oneOf),
      schemaPathParts,
      eventIds,
    );
  }

  const schemaTypes = Array.isArray(schemaNode.type)
    ? schemaNode.type
    : [schemaNode.type];
  const schemaType = schemaTypes.find((type) => type !== 'null');
  if (schemaType === undefined && schemaTypes.includes('null')) return null;

  switch (schemaType) {
    case 'object':
      return Object.fromEntries(
        Object.entries(schemaNode.properties || {}).map(
          ([name, propertySchema]) => [
            name,
            schemaSample(propertySchema, [...schemaPathParts, name], eventIds),
          ],
        ),
      );
    case 'array':
      return schemaNode.items
        ? [schemaSample(schemaNode.items, [...schemaPathParts, '[]'], eventIds)]
        : [];
    case 'integer':
      return 1;
    case 'boolean':
      return false;
    case 'string':
      if (schemaPathParts.join('.') === 'events.[].id') return eventIds[0];
      return 'example';
    case undefined:
      return {};
    default:
      throw new Error(
        `Unsupported schema type ${JSON.stringify(schemaType)} at ${schemaPathParts.join('.')}`,
      );
  }
}

function getSchemaContract(schemaDocument) {
  const personSchema = schemaDocument.properties.persons.items;
  const registrationSchema = personSchema.properties.registration;
  const personalBestSchema = personSchema.properties.personalBests.items;
  const eventSchema = schemaDocument.properties.events.items;
  const roundSchema = eventSchema.properties.rounds.items;
  const participationRulesetSchema =
    roundSchema.properties.participationRuleset;
  const participationSourceSchema =
    participationRulesetSchema.properties.participationSource;
  const resultConditionSchema = participationSourceSchema.oneOf.find(
    (source) => source.properties.type.const === 'round',
  ).properties.resultCondition;

  const eventIds = registrationSchema.properties.eventIds.items.enum;
  const personalBestEventIds = personalBestSchema.properties.eventId.enum;
  assert.deepEqual(
    eventIds,
    personalBestEventIds,
    'Registration and personal-best event IDs differ',
  );

  const resultConditions = resultConditionSchema.oneOf.map((condition) =>
    schemaSample(condition, ['resultCondition'], eventIds),
  );
  const participationSources = participationSourceSchema.oneOf.flatMap(
    (source) => {
      const sample = schemaSample(source, ['participationSource'], eventIds);
      if (!source.properties.resultCondition) return [sample];
      return resultConditions.map((resultCondition) => ({
        ...sample,
        resultCondition,
      }));
    },
  );
  const qualification = schemaSample(
    eventSchema.properties.qualification,
    ['qualification'],
    eventIds,
  );
  const qualifications = resultConditions.map((resultCondition) => ({
    ...qualification,
    resultCondition,
  }));

  return {
    competition: schemaSample(schemaDocument, [], eventIds),
    eventIds,
    formats: roundSchema.properties.format.enum,
    participationSources,
    qualifications,
    reservedPlaces: schemaSample(
      participationRulesetSchema.properties.reservedPlaces,
      ['reservedPlaces'],
      eventIds,
    ),
    resultConditions,
  };
}

function normalizeLegacySchemaIds(schemaNode) {
  if (Array.isArray(schemaNode)) {
    return schemaNode.map(normalizeLegacySchemaIds);
  }
  if (!schemaNode || typeof schemaNode !== 'object') return schemaNode;

  const normalized = Object.fromEntries(
    Object.entries(schemaNode).map(([name, value]) => [
      name,
      normalizeLegacySchemaIds(value),
    ]),
  );
  if (typeof normalized.id === 'string') {
    if (!normalized.$id) normalized.$id = normalized.id;
    delete normalized.id;
  }
  return normalized;
}

function validateFixture(schemaDocument, fixture, fixtureName) {
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validationSchema = normalizeLegacySchemaIds(schemaDocument);
  const validate = ajv.compile(validationSchema);

  if (!validate(fixture)) {
    throw new Error(
      `${fixtureName} does not match ${schemaDocument.id}:\n${JSON.stringify(validate.errors, null, 2)}`,
    );
  }
}

function compileTypeContract(schemaDocument) {
  assert.match(schemaDocument.id, /^WCIFv2\./, 'The schema is not WCIF v2');
  const contract = getSchemaContract(schemaDocument);
  validateFixture(
    schemaDocument,
    contract.competition,
    'The generated schema fixture',
  );

  const source = [
    `import { Competition, EventId, ParticipationSource, Qualification, ReservedPlaces, ResultCondition, RoundFormat } from ${JSON.stringify(path.join(repositoryRoot, 'src', 'models'))};`,
    `const schemaCompetition: Competition = ${JSON.stringify(contract.competition)};`,
    `const schemaEventIds: EventId[] = ${JSON.stringify(contract.eventIds)};`,
    `const schemaFormats: RoundFormat[] = ${JSON.stringify(contract.formats)};`,
    `const schemaParticipationSources: ParticipationSource[] = ${JSON.stringify(contract.participationSources)};`,
    `const schemaQualifications: Qualification[] = ${JSON.stringify(contract.qualifications)};`,
    `const schemaReservedPlaces: ReservedPlaces = ${JSON.stringify(contract.reservedPlaces)};`,
    `const schemaResultConditions: Array<ResultCondition | null> = ${JSON.stringify(contract.resultConditions)};`,
    'void schemaCompetition;',
    'void schemaEventIds;',
    'void schemaFormats;',
    'void schemaParticipationSources;',
    'void schemaQualifications;',
    'void schemaReservedPlaces;',
    'void schemaResultConditions;',
  ].join('\n');
  writeFileSync(typeTestPath, source);

  const program = ts.createProgram([typeTestPath], {
    module: ts.ModuleKind.CommonJS,
    noEmit: true,
    skipLibCheck: true,
    strict: true,
    target: ts.ScriptTarget.ES5,
  });
  const diagnostics = ts.getPreEmitDiagnostics(program);

  if (diagnostics.length > 0) {
    throw new Error(
      ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCanonicalFileName: (fileName) => fileName,
        getCurrentDirectory: () => repositoryRoot,
        getNewLine: () => '\n',
      }),
    );
  }

  console.log(
    `Validated the deterministic fixture and the ${schemaDocument.id} type contract.`,
  );
}

try {
  validateFixture(schema, competition, 'The complete WCIF fixture');
  compileTypeContract(schema);
} finally {
  rmSync(temporaryDirectory, { force: true, recursive: true });
}
