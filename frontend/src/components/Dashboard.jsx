// ============================================
// FILE: frontend/src/components/Dashboard.jsx
// ============================================
import React from 'react';

function Dashboard({ playerData, statConfig, setSelectedStat, setActiveTab }) {
  const xpToLevel = (level) => level * 100;

  const getStatProgress = (stat) => {
    const xpNeeded = xpToLevel(playerData.stats[stat].level);
    return (playerData.stats[stat].xp / xpNeeded) * 100;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Object.entries(statConfig).map(([key, config]) => {
        const stat = playerData.stats[key];
        const progress = getStatProgress(key);

        return (
          <div
            key={key}
            className="bg-slate-800 rounded-xl p-5 border-2 border-slate-700 hover:border-purple-500 transition cursor-pointer transform hover:scale-105"
            onClick={() => {
              setSelectedStat(key);
              setActiveTab('quests');
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-4xl">{config.icon}</span>
              <div className="text-right">
                <div className="text-2xl font-bold">Lv.{stat.level}</div>
                <div className="text-xs text-gray-400">{stat.tasks.length} quests</div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-1">{config.name}</h3>
            <p className="text-sm text-gray-400 mb-3">{config.desc}</p>
            <div className="bg-slate-900 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${config.color} transition-all duration-500`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {stat.xp} / {xpToLevel(stat.level)} XP
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;