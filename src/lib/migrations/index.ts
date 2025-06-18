import * as migration_20250610_203856_init from './20250610_203856_init';
import * as migration_20250613_205520_testimonials from './20250613_205520_testimonials';
import * as migration_20250614_153201_articles from './20250614_153201_articles';
import * as migration_20250614_160421_schools from './20250614_160421_schools';
import * as migration_20250614_161927_mentors2 from './20250614_161927_mentors2';
import * as migration_20250617_142718_mentors3 from './20250617_142718_mentors3';
import * as migration_20250617_144919_testi2 from './20250617_144919_testi2';
import * as migration_20250617_150416_mentorsFeatured from './20250617_150416_mentorsFeatured';
import * as migration_20250617_165604_students from './20250617_165604_students';
import * as migration_20250618_163348_userAuth from './20250618_163348_userAuth';
import * as migration_20250618_184100_mentorsSkills from './20250618_184100_mentorsSkills';

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
    name: '20250614_161927_mentors2',
  },
  {
    up: migration_20250617_142718_mentors3.up,
    down: migration_20250617_142718_mentors3.down,
    name: '20250617_142718_mentors3',
  },
  {
    up: migration_20250617_144919_testi2.up,
    down: migration_20250617_144919_testi2.down,
    name: '20250617_144919_testi2',
  },
  {
    up: migration_20250617_150416_mentorsFeatured.up,
    down: migration_20250617_150416_mentorsFeatured.down,
    name: '20250617_150416_mentorsFeatured',
  },
  {
    up: migration_20250617_165604_students.up,
    down: migration_20250617_165604_students.down,
    name: '20250617_165604_students',
  },
  {
    up: migration_20250618_163348_userAuth.up,
    down: migration_20250618_163348_userAuth.down,
    name: '20250618_163348_userAuth',
  },
  {
    up: migration_20250618_184100_mentorsSkills.up,
    down: migration_20250618_184100_mentorsSkills.down,
    name: '20250618_184100_mentorsSkills'
  },
];
