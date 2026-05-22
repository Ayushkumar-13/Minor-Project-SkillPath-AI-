import React from 'react';
import { CheckCircle, TrendingDown, Info } from 'lucide-react';

export const WeakAreas = ({ weakAreas }) => {
  const hasAreas = weakAreas && weakAreas.length > 0;

  const getSeverityColor = (idx) => {
    if (!weakAreas) return 'amber';
    if (weakAreas.length >= 4) return idx < 2 ? 'red' : 'amber';
    return 'amber';
  };

  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
          {hasAreas ? (
            <TrendingDown className="w-4 h-4 text-amber-400" />
          ) : (
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          )}
          Weak Area Diagnostics
        </h3>
        {hasAreas && (
          <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">
            {weakAreas.length} flagged
          </span>
        )}
      </div>

      {hasAreas ? (
        <>
          <p className="text-[10px] text-gray-500 font-light leading-relaxed">
            Topics where quiz performance dropped below 80%. Retake quizzes to clear these flags.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {weakAreas.map((area, idx) => {
              const isRed = getSeverityColor(idx) === 'red';
              return (
                <span
                  key={idx}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all cursor-default ${
                    isRed
                      ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
                      : 'bg-amber-400/10 border-amber-400/30 text-amber-400 hover:bg-amber-400/20'
                  }`}
                  title="Retake the module quiz to clear this weak area flag"
                >
                  {area}
                </span>
              );
            })}
          </div>
          <div className="flex items-start gap-1.5 pt-2 border-t border-white/5">
            <Info className="w-3 h-3 text-gray-600 mt-0.5 flex-shrink-0" />
            <p className="text-[10px] text-gray-600 leading-relaxed">
              Score 80%+ on the flagged module quiz to automatically clear these diagnostics.
            </p>
          </div>
        </>
      ) : (
        <div className="flex items-start gap-3 py-1">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-400">All Clear</p>
            <p className="text-[10px] text-gray-500 font-light leading-relaxed mt-0.5">
              No weak areas detected. Score below 80% on a module quiz to activate AI diagnostic profiling.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
