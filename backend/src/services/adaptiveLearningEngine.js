// adaptiveLearningEngine.js — Performance-based roadmap adaptation after quiz results

/**
 * Given a quiz result, mutates the roadmap modules to:
 * - Insert a revision module if score < 60%
 * - Inject advanced bonus module if score = 100% and advanced modules exist in pool
 * - Update weak areas list
 *
 * @param {object} params
 * @param {object} params.roadmap        — current roadmap document
 * @param {string} params.moduleId       — the module just quizzed
 * @param {number} params.score          — score out of 5
 * @param {string[]} params.missedTopics — quiz topics answered incorrectly
 * @param {object[]} params.domainPool   — full module pool to pull bonus modules from
 * @returns {{ roadmap, adapted: boolean, action: string }}
 */
export const adaptRoadmap = ({ roadmap, moduleId, score, missedTopics = [], domainPool = [] }) => {
  let adapted = false;
  let action = 'none';

  const percentage = (score / 5) * 100;
  const moduleItem = roadmap.modules.find(m => m.id === moduleId);
  if (!moduleItem) return { roadmap, adapted, action };

  // --- CASE 1: Low score (<60%) → inject a revision sub-module right after current ---
  if (percentage < 60) {
    const revId = `${moduleId}_revision`;
    const alreadyExists = roadmap.modules.some(m => m.id === revId);
    if (!alreadyExists) {
      const currentIdx = roadmap.modules.findIndex(m => m.id === moduleId);
      const revisionModule = {
        id: revId,
        title: `[Adaptive Revision] ${moduleItem.title} — Core Concept Reinforcement`,
        description: `Your quiz identified gaps in: ${missedTopics.join(', ')}. This focused revision module reinforces those fundamentals before proceeding.`,
        durationDays: 3,
        isRevision: true,
        prerequisites: [moduleId],
        tasks: missedTopics.map((topic, i) => ({
          id: `${revId}_task_${i}`,
          title: `Deep-dive review: ${topic} with hands-on exercises`,
          completed: false,
          difficulty: 'beginner',
          learningResources: [{ title: `${topic} — MDN / Official Docs`, url: 'https://developer.mozilla.org', type: 'article' }]
        })),
        quizzes: moduleItem.quizzes, // reuse same quiz pool
        quizScore: -1,
        repoVerified: false
      };
      roadmap.modules.splice(currentIdx + 1, 0, revisionModule);
      adapted = true;
      action = 'revision_injected';
    }
  }

  // --- CASE 2: Perfect score (100%) → try unlocking a bonus advanced module ---
  if (percentage === 100) {
    const existingIds = new Set(roadmap.modules.map(m => m.id));
    const advancedBonus = domainPool.find(m =>
      m.difficulty === 'advanced' &&
      !existingIds.has(m.id) &&
      (m.prerequisites || []).includes(moduleId)
    );
    if (advancedBonus) {
      roadmap.modules.push({ ...advancedBonus, durationDays: advancedBonus.baseDays || 7, quizScore: -1, repoVerified: false });
      adapted = true;
      action = 'advanced_unlocked';
    }
  }

  // --- CASE 3: Update weak areas list ---
  if (!roadmap.weakAreas) roadmap.weakAreas = [];
  missedTopics.forEach(topic => {
    if (!roadmap.weakAreas.includes(topic)) {
      roadmap.weakAreas.push(topic);
    }
  });

  // Remove weak areas that were correctly answered this attempt
  if (percentage >= 80) {
    roadmap.weakAreas = roadmap.weakAreas.filter(w =>
      !moduleItem.quizzes?.some(q => q.question.toLowerCase().includes(w.toLowerCase()))
    );
  }

  return { roadmap, adapted, action };
};
