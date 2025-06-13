import * as migration_20250610_203856_init from './20250610_203856_init';
import * as migration_20250613_205520_testimonials from './20250613_205520_testimonials';

export const migrations = [
  {
    up: migration_20250610_203856_init.up,
    down: migration_20250610_203856_init.down,
    name: '20250610_203856_init',
  },
  {
    up: migration_20250613_205520_testimonials.up,
    down: migration_20250613_205520_testimonials.down,
    name: '20250613_205520_testimonials'
  },
];
