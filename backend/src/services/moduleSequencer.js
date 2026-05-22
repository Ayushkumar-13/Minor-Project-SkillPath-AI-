// moduleSequencer.js — Topological sort of modules by prerequisite dependencies

/**
 * Performs a topological sort on selected modules using their prerequisite lists.
 * Ensures prerequisite modules always appear before the modules that require them.
 * If a cycle is detected, falls back to difficulty-based ordering.
 *
 * @param {object[]} modules — array of module objects with { id, prerequisites: [] }
 * @returns {object[]} — sorted module array
 */
export const sequenceModules = (modules) => {
  if (!modules || modules.length === 0) return [];

  const moduleMap = new Map(modules.map(m => [m.id, m]));
  const visited = new Set();
  const visiting = new Set(); // cycle detection
  const result = [];

  const visit = (moduleId) => {
    if (visited.has(moduleId)) return;
    if (visiting.has(moduleId)) return; // skip cycles

    visiting.add(moduleId);
    const mod = moduleMap.get(moduleId);
    if (mod && mod.prerequisites) {
      for (const prereq of mod.prerequisites) {
        if (moduleMap.has(prereq)) {
          visit(prereq);
        }
      }
    }
    visiting.delete(moduleId);
    visited.add(moduleId);
    if (mod) result.push(mod);
  };

  for (const mod of modules) {
    visit(mod.id);
  }

  // Re-index positions for display
  return result.map((mod, idx) => ({ ...mod, position: idx + 1 }));
};

/**
 * Checks if a module's prerequisites are all present in the selected module pool
 * @param {object} module
 * @param {string[]} availableModuleIds
 * @returns {boolean}
 */
export const prerequisitesSatisfied = (module, availableModuleIds) => {
  if (!module.prerequisites || module.prerequisites.length === 0) return true;
  return module.prerequisites.every(p => availableModuleIds.includes(p));
};
