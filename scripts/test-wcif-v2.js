const { mkdtempSync, rmSync, writeFileSync } = require('fs');
const { spawnSync } = require('child_process');
const { tmpdir } = require('os');
const path = require('path');

const defaultCompetitionIds = [
  'NorthwestChampionship2026',
  'PuzzlingPakenhamSunday2026',
  'CuyunaCubing2026',
  'UCCanterburyOpen2026',
  'VegasCubingFall2026',
  'VivaSaNxNtaCruz2026',
  'TimesUpElmsford2026',
  'CroatianQuietChampionship2026',
  'DarwinOpen2026',
  'IndianFMCChampionship2026',
];

const competitionIds = process.argv.slice(2);
const ids = competitionIds.length > 0 ? competitionIds : defaultCompetitionIds;
const repositoryRoot = path.resolve(__dirname, '..');
const temporaryDirectory = mkdtempSync(path.join(tmpdir(), 'wca-helpers-'));
const typeTestPath = path.join(temporaryDirectory, 'live-wcif-v2.type-test.ts');

async function fetchCompetition(id) {
  const url = `https://www.worldcubeassociation.org/api/v0/competitions/${id}/wcif/version/2`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${id}: HTTP ${response.status}`);
  }

  const competition = await response.json();
  console.log(`${id}: WCIF ${competition.formatVersion}`);
  return competition;
}

async function main() {
  const competitions = await Promise.all(ids.map(fetchCompetition));
  const source = [
    `import { Competition } from ${JSON.stringify(path.join(repositoryRoot, 'src', 'models'))};`,
    `const competitions: Competition[] = ${JSON.stringify(competitions)};`,
    'void competitions;',
  ].join('\n');

  writeFileSync(typeTestPath, source);

  try {
    const typeScriptPath = path.join(
      repositoryRoot,
      'node_modules',
      'typescript',
      'bin',
      'tsc',
    );
    const result = spawnSync(
      process.execPath,
      [
        typeScriptPath,
        '--noEmit',
        '--target',
        'es5',
        '--module',
        'commonjs',
        '--strict',
        '--skipLibCheck',
        typeTestPath,
      ],
      { cwd: repositoryRoot, encoding: 'utf8' },
    );

    if (result.status !== 0) {
      process.stderr.write(result.stdout);
      process.stderr.write(result.stderr);
      process.exitCode = result.status || 1;
      return;
    }

    console.log(`Validated ${competitions.length} WCIF v2 competitions.`);
  } finally {
    rmSync(temporaryDirectory, { force: true, recursive: true });
  }
}

main().catch((error) => {
  rmSync(temporaryDirectory, { force: true, recursive: true });
  console.error(error);
  process.exitCode = 1;
});
