// skillGapAnalyzer.js — Analyzes what skills the user is missing vs what their career goal needs

// Canonical skill requirements per career goal
const CAREER_GOAL_SKILL_MAP = {
  'frontend developer':     ['html', 'css', 'javascript', 'react', 'typescript', 'git', 'testing'],
  'backend developer':      ['node', 'express', 'mongodb', 'sql', 'rest-api', 'jwt', 'docker'],
  'full stack developer':   ['html', 'css', 'javascript', 'react', 'node', 'express', 'mongodb', 'jwt', 'git'],
  'mern developer':         ['html', 'css', 'javascript', 'react', 'node', 'express', 'mongodb', 'jwt'],
  'devops engineer':        ['linux', 'docker', 'kubernetes', 'ci-cd', 'cloud', 'monitoring'],
  'data scientist':         ['python', 'numpy', 'pandas', 'sklearn', 'statistics', 'ml', 'deep-learning'],
  'machine learning engineer': ['python', 'ml', 'deep-learning', 'tensorflow', 'mlops', 'statistics'],
  'ai engineer':            ['python', 'ml', 'deep-learning', 'nlp', 'computer-vision', 'mlops'],
  'data analyst':           ['sql', 'excel', 'python', 'pandas', 'visualization', 'statistics', 'bi-tools'],
  'cybersecurity analyst':  ['networking', 'linux', 'owasp', 'cryptography', 'pentesting', 'siem'],
  'placement preparation':  ['arrays', 'linked-list', 'trees', 'graphs', 'dp', 'system-design', 'sorting'],
  'competitive programmer': ['arrays', 'dp', 'graphs', 'math', 'sorting', 'trees', 'greedy'],
  'default':                ['fundamentals', 'problem-solving', 'git']
};

/**
 * Normalize a skill string for consistent comparison
 */
const normalize = (s) => s.toLowerCase().trim().replace(/[.\-_\s]+/g, '-');

/**
 * Analyze gaps between user's existing skills and career goal requirements
 * @param {string[]} existingSkills
 * @param {string} careerGoal
 * @returns {{ missingSkills: string[], masteredSkills: string[], gapScore: number }}
 */
export const analyzeSkillGap = (existingSkills = [], careerGoal = '') => {
  const normalizedExisting = existingSkills.map(normalize);

  // Find best matching career goal key
  const goalKey = Object.keys(CAREER_GOAL_SKILL_MAP).find(key =>
    careerGoal.toLowerCase().includes(key)
  ) || 'default';

  const required = CAREER_GOAL_SKILL_MAP[goalKey];

  const missingSkills = required.filter(skill => !normalizedExisting.includes(skill));
  const masteredSkills = required.filter(skill => normalizedExisting.includes(skill));

  // gapScore: 0 = no gaps, 1 = all missing
  const gapScore = required.length > 0 ? missingSkills.length / required.length : 1;

  return { missingSkills, masteredSkills, gapScore, requiredSkills: required };
};

/**
 * Check if a module's skills are already covered by existing skills
 * @param {string[]} moduleSkills
 * @param {string[]} existingSkills
 * @returns {{ covered: boolean, coverageRatio: number }}
 */
export const checkModuleCoverage = (moduleSkills = [], existingSkills = []) => {
  if (!moduleSkills.length) return { covered: false, coverageRatio: 0 };
  const normalized = existingSkills.map(normalize);
  const covered = moduleSkills.filter(s => normalized.includes(normalize(s)));
  const ratio = covered.length / moduleSkills.length;
  return { covered: ratio >= 0.8, coverageRatio: ratio };
};

export { CAREER_GOAL_SKILL_MAP };
