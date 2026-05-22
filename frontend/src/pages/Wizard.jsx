import React, { useState, useContext } from 'react';
import { RoadmapContext } from '../context/RoadmapContext';
import { Cpu, Target, Compass, Sparkles, BookOpen, Clock, Heart, Award, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

const DOMAINS = [
  { id: 'MERN', title: 'MERN Stack Development', desc: 'React frontend, Express backend APIs, MongoDB document store, Node servers.', icon: Cpu, color: 'from-cyan-500 to-blue-600' },
  { id: 'DSA', title: 'Data Structures & Algorithms', desc: 'Complexity analysis, sorting, trees, stacks, hash tables, and coding puzzles.', icon: Award, color: 'from-violet-500 to-purple-600' },
  { id: 'Cybersecurity', title: 'Cybersecurity Operations', desc: 'Network security protocols, OWASP top 10 vulnerabilities, mitigation testing.', icon: Compass, color: 'from-pink-500 to-rose-600' },
  { id: 'AI/ML', title: 'AI & Machine Learning', desc: 'Python vectors, Numpy matrices, Pandas DataFrames, and foundational math models.', icon: Target, color: 'from-emerald-500 to-teal-600' },
  { id: 'Data Analytics', title: 'Data Analytics Pipelines', desc: 'SQL data queries, aggregation Joins, and diagnostic table visualizations.', icon: BookOpen, color: 'from-amber-500 to-orange-600' }
];

export const Wizard = ({ onNavigate }) => {
  const { generateRoadmap } = useContext(RoadmapContext);

  const [step, setStep] = useState(1);
  const [domain, setDomain] = useState('');
  const [careerGoal, setCareerGoal] = useState('');
  const [skillLevel, setSkillLevel] = useState('beginner');
  const [dailyStudyTime, setDailyStudyTime] = useState(2); // hours
  
  // Tag Inputs
  const [interestInput, setInterestInput] = useState('');
  const [interests, setInterests] = useState([]);
  
  const [skillInput, setSkillInput] = useState('');
  const [existingSkills, setExistingSkills] = useState([]);

  // Synthesizing Screen state
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthLog, setSynthLog] = useState('');

  // Handlers for tags
  const addInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const removeInterest = (item) => {
    setInterests(interests.filter(i => i !== item));
  };

  const addSkill = () => {
    if (skillInput.trim() && !existingSkills.includes(skillInput.trim())) {
      setExistingSkills([...existingSkills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (item) => {
    setExistingSkills(existingSkills.filter(s => s !== item));
  };

  // Execute synthesis simulation
  const handleSynthesize = async () => {
    if (!domain || !careerGoal) return;
    
    setIsSynthesizing(true);
    
    // Custom logs ticks to look like advanced AI synthesis
    const logs = [
      'Establishing quantum connection to SkillPath AI neural cores...',
      `Parsing chosen curriculum template: ${domain}...`,
      `Adapting difficulty scale factor for: [${skillLevel.toUpperCase()}] tier...`,
      `Calculating learning curve durations for daily study rate: ${dailyStudyTime} hours/day...`,
      `Scanning existing operator skills database: ${existingSkills.length > 0 ? existingSkills.join(', ') : 'None'}...`,
      `Auto-checking matching curriculum modules and accelerating progress...`,
      `Injecting customized review exercises matching interests: ${interests.length > 0 ? interests.join(', ') : 'General'}...`,
      'Compiling 5-MCQ dynamic timed diagnostic quizzes...',
      'Synthesizing personalized timeline blueprint...'
    ];

    for (let i = 0; i < logs.length; i++) {
      await new Promise(r => setTimeout(r, 400));
      setSynthLog(logs[i]);
    }

    try {
      await generateRoadmap({
        domain,
        careerGoal,
        skillLevel,
        dailyStudyTime: Number(dailyStudyTime),
        interests,
        existingSkills
      });
      setIsSynthesizing(false);
      onNavigate('dashboard');
    } catch (err) {
      console.error(err);
      setIsSynthesizing(false);
      alert('Failed generating roadmap. Please retry.');
    }
  };

  if (isSynthesizing) {
    return (
      <div className="min-h-screen bg-[#070A13] flex flex-col items-center justify-center p-6 text-center z-50 relative overflow-hidden">
        {/* Floating tech grids */}
        <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none"></div>
        
        {/* Glowing visual loader */}
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin"></div>
          <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-cyan-400 animate-pulse" />
        </div>

        <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-4 text-glow-cyan">
          Synthesizing AI Learning Path
        </h2>

        {/* Dynamic logs window */}
        <div className="w-full max-w-xl bg-black/60 border border-white/10 rounded-2xl p-6 font-mono text-left text-xs text-cyan-400 space-y-2.5 shadow-[0_0_20px_rgba(0,0,0,0.6)] min-h-[140px] flex flex-col justify-end">
          <div className="opacity-40 animate-pulse">&gt; Initializing neural path engine...</div>
          <div className="text-gray-500">&gt; Logs synchronized.</div>
          <div className="text-white border-l-2 border-cyan-400 pl-3.5 py-1 text-sm bg-cyan-500/5 animate-pulse mt-4">
            {synthLog}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen tech-grid py-12 px-6 flex items-center justify-center overflow-hidden">
      
      {/* Background glow bubble */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px] animate-pulse-slow"></div>

      {/* Progress header bar */}
      <div className="absolute top-6 left-6 flex items-center gap-3">
        <Cpu className="w-6 h-6 text-cyber-primary" />
        <span className="text-sm font-bold text-white tracking-widest">ROADMAP BUILDER</span>
      </div>

      <div className="w-full max-w-3xl glass-panel border border-white/10 rounded-3xl p-8 relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-8 pb-5 border-b border-white/5">
          <div className="flex gap-2">
            {[1, 2, 3].map((num) => (
              <div 
                key={num}
                className={`w-8 h-2 rounded-full transition-all ${
                  step >= num ? 'bg-gradient-to-r from-cyber-primary to-cyber-secondary' : 'bg-cyber-dark border border-white/10'
                }`}
              ></div>
            ))}
          </div>
          <span className="text-xs text-gray-500 uppercase font-black tracking-widest">Step {step} of 3</span>
        </div>

        {/* STEP 1: DOMAIN SELECTION */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Compass className="w-6 h-6 text-cyber-primary" /> CHOOSE YOUR TECH DISCIPLINE
              </h2>
              <p className="text-gray-400 text-sm mt-1">Select the core technical domain you want to master.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DOMAINS.map((dom) => {
                const IconComponent = dom.icon;
                const isSelected = domain === dom.id;
                return (
                  <div
                    key={dom.id}
                    onClick={() => setDomain(dom.id)}
                    className={`relative p-5 rounded-2xl cursor-pointer border transition-all hover:scale-[1.01] ${
                      isSelected 
                        ? 'bg-cyber-card border-cyber-primary/70 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                        : 'bg-cyber-dark/40 border-white/5 hover:border-white/20'
                    }`}
                  >
                    {/* Glowing side accent if selected */}
                    {isSelected && (
                      <div className="absolute top-0 bottom-0 left-0 w-1 rounded-l-2xl bg-gradient-to-b from-cyber-primary to-cyber-secondary"></div>
                    )}

                    <div className="flex gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-tr ${dom.color} text-white flex-shrink-0`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{dom.title}</h4>
                        <p className="text-xs text-gray-500 mt-1 font-light leading-relaxed">{dom.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step navigation bar */}
            <div className="flex justify-end pt-4">
              <button
                onClick={() => setStep(2)}
                disabled={!domain}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white font-bold disabled:opacity-40 flex items-center gap-2 hover:scale-[1.03] active:scale-97 transition-all"
              >
                Proceed to Objectives <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROFILE OBJECTIVES */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Target className="w-6 h-6 text-cyber-primary" /> DEFINE TARGET OBJECTIVES
              </h2>
              <p className="text-gray-400 text-sm mt-1">Specify your end goal, initial speed, and weekly velocity.</p>
            </div>

            <div className="space-y-5">
              {/* Career Goal Text Area */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">What is your Career Goal?</label>
                <textarea
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  placeholder="e.g. Land a Senior React Engineer role, master coding interviews, secure a cloud audit intern position..."
                  className="w-full bg-cyber-dark/80 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-cyber-primary/70 min-h-[80px]"
                  required
                />
              </div>

              {/* Skill level toggles */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Your Initial Skill Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {['beginner', 'intermediate', 'advanced'].map((level) => (
                    <button
                      type="button"
                      key={level}
                      onClick={() => setSkillLevel(level)}
                      className={`py-3.5 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all capitalize ${
                        skillLevel === level 
                          ? 'bg-cyber-primary/10 border-cyber-primary text-cyber-primary font-black' 
                          : 'bg-cyber-dark/50 border-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Study Time slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="text-gray-400 uppercase tracking-widest font-bold">Daily Dedicated Study Time</label>
                  <span className="text-cyber-primary font-black">{dailyStudyTime} Hours / Day</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="8"
                  step="0.5"
                  value={dailyStudyTime}
                  onChange={(e) => setDailyStudyTime(e.target.value)}
                  className="w-full h-1.5 bg-cyber-dark rounded-lg appearance-none cursor-pointer border border-white/5"
                />
                <div className="flex justify-between text-[10px] text-gray-600">
                  <span>0.5 Hr (Casual)</span>
                  <span>2 Hrs (Medium)</span>
                  <span>4 Hrs (Accelerated)</span>
                  <span>8 Hrs (Intense Boot camp)</span>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4 border-t border-white/5">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-3 rounded-xl border border-white/10 glass-panel hover:bg-white/5 text-gray-300 font-bold flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Domain Setup
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!careerGoal.trim()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white font-bold disabled:opacity-40 flex items-center gap-2 hover:scale-[1.03]"
              >
                Proceed to Skills <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: EXISTING SKILLS & INTERESTS */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-cyber-primary" /> EXISTING SKILLS & GAPS
              </h2>
              <p className="text-gray-400 text-sm mt-1">Specify topics you already understand to accelerate progress, and enter interests to personalize project exercises.</p>
            </div>

            <div className="space-y-5">
              {/* Existing Skills tags */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Skills You Already Hold</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    placeholder="e.g. HTML, JavaScript, Python, CSS (Press Enter to add)"
                    className="flex-1 bg-cyber-dark/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-primary/70"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 rounded-xl bg-cyber-dark border border-white/10 text-xs font-bold hover:text-white"
                  >
                    Add
                  </button>
                </div>
                {/* Visual Tags */}
                <div className="flex flex-wrap gap-2 pt-1.5">
                  {existingSkills.map(item => (
                    <span 
                      key={item}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-primary/10 border border-cyber-primary/30 text-cyber-primary text-xs font-bold"
                    >
                      {item}
                      <button type="button" onClick={() => removeSkill(item)} className="text-gray-400 hover:text-white font-extrabold">&times;</button>
                    </span>
                  ))}
                  {existingSkills.length === 0 && <span className="text-xs text-gray-600 font-light">No existing skills specified. Core foundations will be generated.</span>}
                </div>
              </div>

              {/* Personal Interests tags */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Personal Interests (Themes projects)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={interestInput}
                    onChange={(e) => setInterestInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                    placeholder="e.g. E-commerce, Social Media, Health, SaaS (Press Enter to add)"
                    className="flex-1 bg-cyber-dark/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyber-primary/70"
                  />
                  <button
                    type="button"
                    onClick={addInterest}
                    className="px-4 rounded-xl bg-cyber-dark border border-white/10 text-xs font-bold hover:text-white"
                  >
                    Add
                  </button>
                </div>
                {/* Visual Tags */}
                <div className="flex flex-wrap gap-2 pt-1.5">
                  {interests.map(item => (
                    <span 
                      key={item}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-secondary/10 border border-cyber-secondary/30 text-cyber-secondary text-xs font-bold"
                    >
                      {item}
                      <button type="button" onClick={() => removeInterest(item)} className="text-gray-400 hover:text-white font-extrabold">&times;</button>
                    </span>
                  ))}
                  {interests.length === 0 && <span className="text-xs text-gray-600 font-light">No custom interests declared. Standard template challenges will be used.</span>}
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4 border-t border-white/5">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-3 rounded-xl border border-white/10 glass-panel hover:bg-white/5 text-gray-300 font-bold flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Parameters Setup
              </button>
              <button
                onClick={handleSynthesize}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyber-primary to-cyber-secondary text-white font-black shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 flex items-center gap-2 hover:scale-[1.03] active:scale-97 transition-all"
              >
                <Sparkles className="w-4 h-4 animate-bounce" /> Synthesize AI Roadmap
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
