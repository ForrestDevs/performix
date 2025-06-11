import * as migration_20250610_203856_init from './20250610_203856_init';

export const migrations = [
  {
    up: migration_20250610_203856_init.up,
    down: migration_20250610_203856_init.down,
    name: '20250610_203856_init'
  },
];
