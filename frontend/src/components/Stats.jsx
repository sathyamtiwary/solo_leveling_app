// ============================================
// FILE: frontend/src/components/Stats.jsx
// ============================================
import React from 'react';

function Stats({ playerData, statConfig }) {
  const xpToLevel = (level) => level * 100;

  const getStatProgress = (stat) => {
    const xpNeeded = xpToLevel(playerData.stats[stat].level);
    return (playerData.stats[stat].xp / xpNeeded) * 100;
  };

  const getTotalLevel = () => {
    return Object.values(playerData.stats).reduce((sum, stat) => sum + stat.level, 0);
  };

  const getRankTitle = () => {
    const level = playerData.level;
    if (level >= 50) return '🏆 Shadow Monarch';
    if (level >= 40) return '👑 National Hunter';
    if (level >= 30) return '⚔️ S-Rank Hunter';
    if (level >= 20) return '🗡️ A-Rank Hunter';
    if (level >= 10) return '🛡️ B-Rank Hunter';
    return '⚡ E-Rank Hunter';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">📊 Stat Overview</h2>
        <div className="space-y-4">
          {Object.entries(statConfig).map(([key, config]) => {
            const stat = playerData.stats[key];
            const progress = getStatProgress(key);

            return (
              <div key={key} className="bg-slate-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{config.icon}</span>
                    <span className="font-semibold">{config.name}</span>
                  </div>
                  <span className="text-xl font-bold">Lv.{stat.level}</span>
                </div>
                <div className="bg-slate-800 rounded-full h-4 overflow-hidden mb-1">
                  <div
                    className={`h-full bg-gradient-to-r ${config.color}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400">
                  {stat.xp} / {xpToLevel(stat.level)} XP ({progress.toFixed(1)}%)
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">🏆 Achievements</h2>
        <div className="space-y-4">
          <div className="bg-slate-900 rounded-lg p-4">
            <div className="text-4xl mb-2">👑</div>
            <h3 className="font-bold mb-1">Total Level</h3>
            <div className="text-3xl font-bold text-purple-400">{getTotalLevel()}</div>
          </div>

          <div className="bg-slate-900 rounded-lg p-4">
            <div className="text-4xl mb-2">⭐</div>
            <h3 className="font-bold mb-1">Total XP Earned</h3>
            <div className="text-3xl font-bold text-yellow-400">{playerData.totalXP}</div>
          </div>

          <div className="bg-slate-900 rounded-lg p-4">
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="font-bold mb-1">Active Quests</h3>
            <div className="text-3xl font-bold text-blue-400">
              {Object.values(playerData.stats).reduce((sum, stat) => sum + stat.tasks.length, 0)}
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4">
            <div className="text-4xl mb-2">🏅</div>
            <h3 className="font-bold mb-1">Current Rank</h3>
            <div className="text-2xl font-bold">{getRankTitle()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;