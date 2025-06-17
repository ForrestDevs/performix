type SkillValue =
  | 'defensive-awareness'
  | 'defending-the-rush'
  | 'offensive-production'
  | 'breaking-out'
  | 'winning-the-battle'
  | 'playmaking'
  | 'skating-ability'
  | 'puck-handling'
  | 'reaction-speed'
  | 'agility'
  | 'speed'
  | 'wallplay'
  | 'stickhandling'
  | 'hockey-iq'
  | 'teamwork'
  | 'leadership'

/**
 * Prettifies skill enum values by removing dashes and converting to title case
 * @param skill - The skill enum value
 * @returns Formatted skill name
 *
 * @example
 * prettifySkill("defensive-awareness") // "Defensive Awareness"
 * prettifySkill("hockey-iq") // "Hockey IQ"
 */
export function prettifySkill(skill: SkillValue): string {
  // Special handling for hockey-iq to make it "Hockey IQ"
  if (skill === 'hockey-iq') {
    return 'Hockey IQ'
  }

  return skill
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Prettifies skill enum values in all uppercase format
 * @param skill - The skill enum value
 * @returns Formatted skill name in uppercase
 *
 * @example
 * prettifySkillUppercase("defensive-awareness") // "DEFENSIVE AWARENESS"
 * prettifySkillUppercase("hockey-iq") // "HOCKEY IQ"
 */
export function prettifySkillUppercase(skill: SkillValue): string {
  return skill.replace(/-/g, ' ').toUpperCase()
}
