import React from 'react';
import { Loader2, X, AlertTriangle, CheckCircle2, RotateCcw } from 'lucide-react';

export const QuizModal = ({
  isOpen,
  quizModule,
  onClose,
  selectedAnswers,
  onSelectAnswer,
  quizTimer,
  quizSubmitted,
  quizResult,
  quizLoading,
  onSubmitQuiz,
  onRetakeQuiz
}) => {
  if (!isOpen || !quizModule) return null;

  return (
    <div className="fixed inset-0 bg-cyber-dark/85 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl glass-panel border border-cyber-primary/20 rounded-3xl p-6 shadow-[0_0_40px_rgba(6,182,212,0.15)] overflow-hidden">
        
        {/* Modal Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[10px] text-cyber-primary font-black uppercase tracking-widest">
          Interactive Assessment
        </span>
        <h3 className="text-lg font-black text-white mt-1">{quizModule.title} Timed Quiz</h3>

        {/* QUIZ FORM */}
        {!quizSubmitted ? (
          <div className="mt-5 space-y-6">
            
            {/* Timer Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-gray-400">Time Remaining</span>
                <span className={`font-black ${quizTimer < 15 ? 'text-red-400 animate-pulse' : 'text-cyber-primary'}`}>
                  {quizTimer} Seconds
                </span>
              </div>
              <div className="w-full bg-cyber-dark h-2 rounded-full overflow-hidden border border-white/5">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    quizTimer < 15 ? 'bg-red-500' : 'bg-cyber-primary'
                  }`} 
                  style={{ width: `${(quizTimer / 60) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Questions Container */}
            <div className="space-y-6 max-h-[350px] overflow-y-auto pr-1">
              {quizModule.quizzes.map((q, qIdx) => (
                <div key={q.id} className="space-y-2.5 p-4 rounded-xl bg-cyber-dark/40 border border-white/5">
                  <h4 className="text-xs font-bold text-white flex items-start gap-2">
                    <span className="text-cyber-primary font-mono">{qIdx + 1}.</span>
                    <span>{q.question}</span>
                  </h4>

                  <div className="grid grid-cols-1 gap-2 pl-4">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[qIdx] === optIdx;
                      return (
                        <button
                          type="button"
                          key={optIdx}
                          onClick={() => onSelectAnswer(qIdx, optIdx)}
                          className={`text-left p-3 rounded-lg text-xs font-medium border transition-all ${
                            isSelected 
                              ? 'bg-cyber-primary/10 border-cyber-primary text-cyber-primary font-bold shadow-[0_0_10px_rgba(6,182,212,0.1)]' 
                              : 'bg-cyber-dark border-white/5 text-gray-400 hover:text-white hover:border-white/10'
                          }`}
                        >
                          <span className="font-mono text-gray-500 mr-2">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>{' '}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <button
              onClick={onSubmitQuiz}
              disabled={quizLoading}
              className="w-full bg-gradient-to-r from-cyber-primary to-cyber-secondary hover:brightness-110 text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {quizLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Evaluate Assessment'}
            </button>
          </div>
        ) : (
          
          /* QUIZ SCORECARD RESULT DISPLAY */
          <div className="mt-5 space-y-6">
            
            {/* Summary Score Frame */}
            <div className="text-center p-6 rounded-2xl bg-cyber-dark/60 border border-white/5 space-y-2">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Grading Output</span>
              <div className="text-5xl font-black text-white">
                {quizResult?.score} <span className="text-gray-600">/ 5</span>
              </div>
              
              {quizResult?.passed ? (
                <div className="text-emerald-400 font-bold text-sm flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4.5 h-4.5" /> Proficiency Verified (Passed)
                </div>
              ) : (
                <div className="text-red-400 font-bold text-sm flex items-center justify-center gap-1.5">
                  <AlertTriangle className="w-4.5 h-4.5" /> Below standard limits (Failed)
                </div>
              )}

              {quizResult?.recommendationUpdate && (
                <p className="text-xs text-cyan-400 bg-cyan-500/5 p-3 rounded-xl border border-cyan-500/10 mt-3 font-mono">
                  🤖 {quizResult.recommendationUpdate}
                </p>
              )}
            </div>

            {/* Questions Breakdown List */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Question Breakdown</h4>
              
              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                {quizModule.quizzes.map((q, idx) => {
                  const userAns = selectedAnswers[idx];
                  const correctAns = q.correctAnswer;
                  const isCorrect = userAns === correctAns;

                  return (
                    <div key={idx} className={`p-4 rounded-xl border space-y-1.5 ${
                      isCorrect ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-red-500/5 border-red-500/10'
                    }`}>
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-white">Question {idx + 1}</span>
                        <span className={isCorrect ? 'text-emerald-400' : 'text-red-400'}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 leading-normal">{q.question}</p>
                      <div className="text-[10px] space-y-1">
                        <p className="text-gray-500">Your choice: <span className="text-white">{q.options[userAns] || 'Skipped'}</span></p>
                        {!isCorrect && (
                          <>
                            <p className="text-emerald-400">Correct choice: <span>{q.options[correctAns]}</span></p>
                            <p className="text-cyan-400 italic font-mono pt-1.5 border-t border-white/5 leading-relaxed">&gt; {q.explanation}</p>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-4">
              <button
                onClick={onRetakeQuiz}
                className="flex-1 py-3 rounded-xl border border-white/10 text-xs text-gray-300 font-bold hover:text-white flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Assessment
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-cyber-primary text-cyber-dark font-black text-xs rounded-xl flex items-center justify-center"
              >
                Close & Sync Timeline
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
