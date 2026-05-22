// recommendationEngine.js — Weighted module scoring and selection algorithm

import { checkModuleCoverage } from './skillGapAnalyzer.js';
import { prerequisitesSatisfied } from './moduleSequencer.js';

// Interest keyword → module tag mappings
const INTEREST_TAG_MAP = {
  gaming:      ['game', 'canvas', 'ui', 'animation'],
  finance:     ['finance', 'dashboard', 'analytics', 'data'],
  healthcare:  ['api', 'data', 'backend', 'security'],
  ecommerce:   ['fullstack', 'react', 'node', 'payment'],
  social:      ['react', 'realtime', 'api', 'auth'],
  ai:          ['ml', 'python', 'data', 'nlp'],
  security:    ['security', 'crypto', 'network', 'owasp'],
  mobile:      ['react-native', 'ui', 'api', 'auth'],
  education:   ['react', 'fullstack', 'api', 'dashboard'],
  devops:      ['docker', 'ci-cd', 'cloud', 'linux'],
};

// Difficulty numeric mapping
const DIFFICULTY_RANK = { beginner: 1, intermediate: 2, advanced: 3 };

const LEVEL_RANK = { beginner: 1, intermediate: 2, advanced: 3 };

/**
 * Score a single module for a given user profile.
 * Returns a score between 0–100 (higher = more relevant).
 *
 * Weights:
 *   Career goal relevance   35%
 *   Skill gap fill          25%
 *   Interest alignment      20%
 *   Difficulty match        15%
 *   Prerequisites met        5%
 */
export const scoreModule = ({
  module,
  careerGoal,
  missingSkills,
  interests,
  skillLevel,
  existingSkills,
  selectedModuleIds
}) => {
  // 1. Career goal relevance (0–35)
  const goalKey = Object.keys(module.careerGoalScores || {}).find(k =>
    careerGoal.toLowerCase().includes(k)
  );
  const goalScore = goalKey ? (module.careerGoalScores[goalKey] / 10) * 35 : 10;

  // 2. Skill gap fill (0–25): how many missing skills does this module cover?
  const covers = (module.skillsCovered || []).filter(s =>
    missingSkills.includes(s.toLowerCase())
  );
  const gapScore = missingSkills.length > 0
    ? (covers.length / missingSkills.length) * 25
    : 12.5;

  // 3. Interest alignment (0–20)
  const interestTags = interests.flatMap(interest => {
    const key = Object.keys(INTEREST_TAG_MAP).find(k => interest.toLowerCase().includes(k));
    return key ? INTEREST_TAG_MAP[key] : [];
  });
  const modTags = module.tags || [];
  const tagMatches = modTags.filter(t => interestTags.includes(t)).length;
  const interestScore = interestTags.length > 0
    ? Math.min((tagMatches / Math.max(interestTags.length, 1)) * 20, 20)
    : 10;

  // 4. Difficulty match (0–15)
  const userLevel = LEVEL_RANK[skillLevel] || 1;
  const modLevel = DIFFICULTY_RANK[module.difficulty] || 1;
  const diff = Math.abs(userLevel - modLevel);
  const difficultyScore = diff === 0 ? 15 : diff === 1 ? 9 : 3;

  // 5. Prerequisites satisfied (0–5)
  const prereqScore = prerequisitesSatisfied(module, selectedModuleIds) ? 5 : 0;

  // 6. Penalty: module already covered by existing skills (0 or -20)
  const { covered } = checkModuleCoverage(module.skillsCovered || [], existingSkills);
  const coveragePenalty = covered ? -20 : 0;

  return Math.max(0, goalScore + gapScore + interestScore + difficultyScore + prereqScore + coveragePenalty);
};

/**
 * Select and rank modules from the full domain pool for the user.
 * @param {object[]} pool         Full module pool for a domain
 * @param {object}   userProfile  { careerGoal, skillLevel, interests, missingSkills, existingSkills }
 * @param {number}   maxModules   Max modules to select
 * @returns {object[]} Scored and sorted modules
 */
export const selectModules = (pool, userProfile, maxModules = 6) => {
  const selectedIds = [];
  const scored = [];

  // Score every module
  for (const module of pool) {
    const score = scoreModule({
      module,
      ...userProfile,
      selectedModuleIds: selectedIds
    });
    scored.push({ ...module, _score: score });
  }

  // Sort by score descending
  scored.sort((a, b) => b._score - a._score);

  // Pick top modules, respecting difficulty gates for beginners
  const userLevel = LEVEL_RANK[userProfile.skillLevel] || 1;
  const selected = [];

  for (const mod of scored) {
    if (selected.length >= maxModules) break;
    const modLevel = DIFFICULTY_RANK[mod.difficulty] || 1;
    // Beginners can't start at advanced modules unless they have no other options
    if (userLevel === 1 && modLevel === 3 && selected.length < maxModules - 1) continue;
    selected.push(mod);
    selectedIds.push(mod.id);
  }

  return selected;
};
