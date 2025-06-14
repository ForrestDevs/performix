import * as migration_20250610_203856_init from './20250610_203856_init';
import * as migration_20250613_205520_testimonials from './20250613_205520_testimonials';
import * as migration_20250614_153201_articles from './20250614_153201_articles';
import * as migration_20250614_160421_schools from './20250614_160421_schools';
import * as migration_20250614_161927_mentors2 from './20250614_161927_mentors2';

export const migrations = [
  {
    up: migration_20250610_203856_init.up,
    down: migration_20250610_203856_init.down,
    name: '20250610_203856_init',
  },
  {
    up: migration_20250613_205520_testimonials.up,
    down: migration_20250613_205520_testimonials.down,
    name: '20250613_205520_testimonials',
  },
  {
    up: migration_20250614_153201_articles.up,
    down: migration_20250614_153201_articles.down,
    name: '20250614_153201_articles',
  },
  {
    up: migration_20250614_160421_schools.up,
    down: migration_20250614_160421_schools.down,
    name: '20250614_160421_schools',
  },
  {
    up: migration_20250614_161927_mentors2.up,
    down: migration_20250614_161927_mentors2.down,
    name: '20250614_161927_mentors2'
  },
];
