// ============================================
// FILE: frontend/src/components/Quests.jsx
// ============================================
import React, { useState } from 'react';

function Quests({ playerData, setPlayerData, statConfig, selectedStat, setSelectedStat, setShowLevelUp }) {
  const [newTask, setNewTask] = useState({ title: '', xp: 10, difficulty: 'normal' });

  const xpToLevel = (level) => level * 100;

  const addXP = (stat, amount) => {
    setPlayerData(prev => {
      const newXP = prev.stats[stat].xp + amount;
      const currentLevel = prev.stats[stat].level;
      const xpNeeded = xpToLevel(currentLevel);

      let newLevel = currentLevel;
      let remainingXP = newXP;

      if (newXP >= xpNeeded) {
        newLevel = currentLevel + 1;
        remainingXP = newXP - xpNeeded;
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 2000);
      }

      const totalXP = prev.totalXP + amount;
      const playerLevel = Math.floor(totalXP / 800) + 1;

      return {
        ...prev,
        level: playerLevel,
        totalXP: totalXP,
        stats: {
          ...prev.stats,
          [stat]: {
            ...prev.stats[stat],
            level: newLevel,
            xp: remainingXP
          }
        }
      };
    });
  };

  const completeTask = (stat, taskIndex) => {
    const task = playerData.stats[stat].tasks[taskIndex];
    addXP(stat, task.xp);

    setPlayerData(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: {
          ...prev.stats[stat],
          tasks: prev.stats[stat].tasks.filter((_, i) => i !== taskIndex)
        }
      }
    }));
  };

  const addTask = (stat) => {
    if (!newTask.title.trim()) return;

    setPlayerData(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: {
          ...prev.stats[stat],
          tasks: [...prev.stats[stat].tasks, { ...newTask, id: Date.now() }]
        }
      }
    }));

    setNewTask({ title: '', xp: 10, difficulty: 'normal' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 bg-slate-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Select Attribute</h2>
        <div className="space-y-2">
          {Object.entries(statConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setSelectedStat(key)}
              className={`w-full text-left p-3 rounded-lg transition ${
                selectedStat === key
                  ? 'bg-purple-600 border-2 border-purple-400'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{config.icon}</span>
                <div>
                  <div className="font-semibold">{config.name}</div>
                  <div className="text-xs text-gray-400">Level {playerData.stats[key].level}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2">
        {selectedStat ? (
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">{statConfig[selectedStat].icon}</span>
              <div>
                <h2 className="text-2xl font-bold">{statConfig[selectedStat].name}</h2>
                <p className="text-gray-400">Level {playerData.stats[selectedStat].level}</p>
              </div>
            </div>

            <div className="bg-slate-900 rounded-lg p-4 mb-6">
              <h3 className="font-bold mb-3">🎯 Create New Quest</h3>
              <input
                type="text"
                placeholder="Quest description..."
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && addTask(selectedStat)}
                className="w-full bg-slate-800 rounded px-4 py-2 mb-2 outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="XP"
                  value={newTask.xp}
                  onChange={(e) => setNewTask({ ...newTask, xp: parseInt(e.target.value) || 10 })}
                  className="w-24 bg-slate-800 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                />
                <select
                  value={newTask.difficulty}
                  onChange={(e) => setNewTask({ ...newTask, difficulty: e.target.value })}
                  className="flex-1 bg-slate-800 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="easy">Easy</option>
                  <option value="normal">Normal</option>
                  <option value="hard">Hard</option>
                </select>
                <button
                  onClick={() => addTask(selectedStat)}
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded font-semibold"
                >
                  Add Quest
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-lg">Active Quests</h3>
              {playerData.stats[selectedStat].tasks.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No active quests. Create one to start leveling up!
                </div>
              ) : (
                playerData.stats[selectedStat].tasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="bg-slate-900 rounded-lg p-4 flex items-center justify-between hover:bg-slate-700 transition"
                  >
                    <div className="flex-1">
                      <div className="font-semibold">{task.title}</div>
                      <div className="text-sm text-gray-400">
                        +{task.xp} XP • {task.difficulty}
                      </div>
                    </div>
                    <button
                      onClick={() => completeTask(selectedStat, index)}
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold"
                    >
                      ✓ Complete
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-xl p-6 flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-xl">Select an attribute to view quests</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quests;
