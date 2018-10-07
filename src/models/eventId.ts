export type CurrentEventId = '222' | '333' | '444' | '555' | '666' | '777' |  // cubes
                             '333bf' | '333fm' | '333oh' | '333ft' |          // 333 variations
                             'clock' | 'minx' | 'pyra' | 'skewb' | 'sq1' |    // other puzzles
                             '444bf' | '555bf' | '333mbf';                    // big and multiblind

export type DeprecatedEventId = 'magic' | 'mmagic' | '333mbo';

export type EventId = CurrentEventId | DeprecatedEventId;