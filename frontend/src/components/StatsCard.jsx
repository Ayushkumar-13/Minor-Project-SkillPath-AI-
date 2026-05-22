import React from 'react';

export const StatsCard = ({ title, value, label, icon: IconComponent, iconColor = 'text-cyber-primary', accentColor = 'border-cyber-primary/30' }) => {
  return (
    <div className={`glass-panel rounded-xl p-4 border border-white/5 border-l-2 ${accentColor} text-center flex flex-col justify-between h-28 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-200 group cursor-default`}>
      <div className="flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase tracking-wider">
        {title}
        <IconComponent className={`w-3.5 h-3.5 ${iconColor} group-hover:scale-110 transition-transform`} />
      </div>
      <p className="text-3xl font-black text-white py-1 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
        {value}
      </p>
      <span className="text-[10px] text-gray-500 font-light">{label}</span>
    </div>
  );
};
