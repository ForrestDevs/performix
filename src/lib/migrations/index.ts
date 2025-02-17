import * as migration_20250217_072708_init from './20250217_072708_init';
import * as migration_20250217_074008_upload from './20250217_074008_upload';

export const migrations = [
  {
    up: migration_20250217_072708_init.up,
    down: migration_20250217_072708_init.down,
    name: '20250217_072708_init',
  },
  {
    up: migration_20250217_074008_upload.up,
    down: migration_20250217_074008_upload.down,
    name: '20250217_074008_upload'
  },
];
