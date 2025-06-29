import * as migration_20250610_203856_init from './20250610_203856_init'
import * as migration_20250613_205520_testimonials from './20250613_205520_testimonials'
import * as migration_20250614_153201_articles from './20250614_153201_articles'
import * as migration_20250614_160421_schools from './20250614_160421_schools'
import * as migration_20250614_161927_mentors2 from './20250614_161927_mentors2'
import * as migration_20250617_142718_mentors3 from './20250617_142718_mentors3'
import * as migration_20250617_144919_testi2 from './20250617_144919_testi2'
import * as migration_20250617_150416_mentorsFeatured from './20250617_150416_mentorsFeatured'
import * as migration_20250617_165604_students from './20250617_165604_students'
import * as migration_20250618_163348_userAuth from './20250618_163348_userAuth'
import * as migration_20250618_184100_mentorsSkills from './20250618_184100_mentorsSkills'
import * as migration_20250619_193014_coursev2 from './20250619_193014_coursev2'
import * as migration_20250619_194059_blueprints from './20250619_194059_blueprints'
import * as migration_20250619_194839_enrollments from './20250619_194839_enrollments'
import * as migration_20250624_201514_stripeUser from './20250624_201514_stripeUser'
import * as migration_20250626_172753_betterAuthStripe from './20250626_172753_betterAuthStripe'
import * as migration_20250626_204354_stripePlans from './20250626_204354_stripePlans'
import * as migration_20250627_160725_stripePlans2 from './20250627_160725_stripePlans2'
import * as migration_20250627_192419_popularPlan from './20250627_192419_popularPlan'
import * as migration_20250628_182152_dropEnrollments from './20250628_182152_dropEnrollments'
import * as migration_20250628_182718_enrollments2 from './20250628_182718_enrollments2'
import * as migration_20250628_185034_productSync from './20250628_185034_productSync'
import * as migration_20250628_202057_enrollments3 from './20250628_202057_enrollments3'
import * as migration_20250628_210423_transactions2 from './20250628_210423_transactions2'
import * as migration_20250628_214356_transactions3 from './20250628_214356_transactions3'

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
    name: '20250618_184100_mentorsSkills',
  },
  {
    up: migration_20250619_193014_coursev2.up,
    down: migration_20250619_193014_coursev2.down,
    name: '20250619_193014_coursev2',
  },
  {
    up: migration_20250619_194059_blueprints.up,
    down: migration_20250619_194059_blueprints.down,
    name: '20250619_194059_blueprints',
  },
  {
    up: migration_20250619_194839_enrollments.up,
    down: migration_20250619_194839_enrollments.down,
    name: '20250619_194839_enrollments',
  },
  {
    up: migration_20250624_201514_stripeUser.up,
    down: migration_20250624_201514_stripeUser.down,
    name: '20250624_201514_stripeUser',
  },
  {
    up: migration_20250626_172753_betterAuthStripe.up,
    down: migration_20250626_172753_betterAuthStripe.down,
    name: '20250626_172753_betterAuthStripe',
  },
  {
    up: migration_20250626_204354_stripePlans.up,
    down: migration_20250626_204354_stripePlans.down,
    name: '20250626_204354_stripePlans',
  },
  {
    up: migration_20250627_160725_stripePlans2.up,
    down: migration_20250627_160725_stripePlans2.down,
    name: '20250627_160725_stripePlans2',
  },
  {
    up: migration_20250627_192419_popularPlan.up,
    down: migration_20250627_192419_popularPlan.down,
    name: '20250627_192419_popularPlan',
  },
  {
    up: migration_20250628_182152_dropEnrollments.up,
    down: migration_20250628_182152_dropEnrollments.down,
    name: '20250628_182152_dropEnrollments',
  },
  {
    up: migration_20250628_182718_enrollments2.up,
    down: migration_20250628_182718_enrollments2.down,
    name: '20250628_182718_enrollments2',
  },
  {
    up: migration_20250628_185034_productSync.up,
    down: migration_20250628_185034_productSync.down,
    name: '20250628_185034_productSync',
  },
  {
    up: migration_20250628_202057_enrollments3.up,
    down: migration_20250628_202057_enrollments3.down,
    name: '20250628_202057_enrollments3',
  },
  {
    up: migration_20250628_210423_transactions2.up,
    down: migration_20250628_210423_transactions2.down,
    name: '20250628_210423_transactions2',
  },
  {
    up: migration_20250628_214356_transactions3.up,
    down: migration_20250628_214356_transactions3.down,
    name: '20250628_214356_transactions3',
  },
]
