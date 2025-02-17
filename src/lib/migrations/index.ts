import * as migration_20250217_072708_init from './20250217_072708_init';

export const migrations = [
  {
    up: migration_20250217_072708_init.up,
    down: migration_20250217_072708_init.down,
    name: '20250217_072708_init'
  },
];
