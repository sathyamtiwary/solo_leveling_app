// ============================================
// FILE: frontend/src/App.jsx
// ============================================
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Quests from './components/Quests';
import Stats from './components/Stats';
import { Save } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [playerData, setPlayerData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStat, setSelectedStat] = useState(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const statConfig = {
    physique: { icon: '💪', color: 'from-red-500 to-orange-500', name: 'Physique', desc: 'Strength & Fitness' },
    diet: { icon: '🍎', color: 'from-green-500 to-emerald-500', name: 'Diet', desc: 'Nutrition & Health' },
    skin: { icon: '✨', color: 'from-pink-500 to-rose-500', name: 'Skin Care', desc: 'Grooming & Appearance' },
    career: { icon: '💼', color: 'from-blue-500 to-cyan-500', name: 'Career', desc: 'Skills & Job Growth' },
    relationship: { icon: '❤️', color: 'from-purple-500 to-pink-500', name: 'Relationships', desc: 'Social Connections' },
    bodyLanguage: { icon: '🎭', color: 'from-indigo-500 to-purple-500', name: 'Body Language', desc: 'Presence & Posture' },
    charisma: { icon: '⭐', color: 'from-yellow-500 to-orange-500', name: 'Charisma', desc: 'Influence & Charm' },
    savings: { icon: '💰', color: 'from-green-600 to-teal-500', name: 'Savings', desc: 'Financial Growth' }
  };

  useEffect(() => {
    if (token) {
      loadUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadUserData = async () => {
    try {
      const response = await axios.get(`${API_URL}/progress`, {
        headers: { 'x-auth-token': token }
      });
      setPlayerData(response.data);
      setUser({ email: response.data.email, name: response.data.name });
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading user data:', error);
      if (error.response?.status === 401) {
        handleLogout();
      }
      setIsLoading(false);
    }
  };

  const saveProgress = async (data) => {
    if (!token) return;

    try {
      await axios.put(`${API_URL}/progress`, data, {
        headers: { 'x-auth-token': token }
      });
      setSaveStatus('💾 Saved');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (error) {
      console.error('Error saving progress:', error);
      setSaveStatus('⚠️ Save failed');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  useEffect(() => {
    if (playerData && !isLoading) {
      saveProgress(playerData);
    }
  }, [playerData]);

  const handleLogin = async (token) => {
    setIsLoading(true);
    setToken(token);
    localStorage.setItem('token', token);

    try {
      const response = await axios.get(`${API_URL}/progress`, {
        headers: { 'x-auth-token': token }
      });

      setPlayerData(response.data);
      setUser({
        email: response.data.email,
        name: response.data.name
      });
    } catch (error) {
      console.error('Error loading user data after login:', error);
      handleLogout();
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setPlayerData(null);
    localStorage.removeItem('token');
  };

  const updatePlayerData = (newData) => {
    setPlayerData(newData);
  };

  const getRankTitle = () => {
    if (!playerData) return '';
    const level = playerData.level;
    if (level >= 50) return '🏆 Shadow Monarch';
    if (level >= 40) return '👑 National Hunter';
    if (level >= 30) return '⚔️ S-Rank Hunter';
    if (level >= 20) return '🗡️ A-Rank Hunter';
    if (level >= 10) return '🛡️ B-Rank Hunter';
    return '⚡ E-Rank Hunter';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl">⚡ Loading...</div>
      </div>
    );
  }

  if (!token) {
    return <Auth onLogin={handleLogin} apiUrl={API_URL} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      {showLevelUp && (
        <div className="fixed inset-0 flex items-center justify-center z-50 animate-pulse">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-6xl font-bold px-12 py-6 rounded-2xl shadow-2xl">
            ⚡ LEVEL UP! ⚡
          </div>
        </div>
      )}

      {saveStatus && (
        <div className="fixed top-6 right-6 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg z-40 border border-purple-500">
          {saveStatus}
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 shadow-2xl border-2 border-purple-400">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">⚔️ Solo Leveling System</h1>
              <p className="text-purple-200">{getRankTitle()}</p>
              <p className="text-sm text-purple-200 mt-1">{user?.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-5xl font-bold">{playerData?.level}</div>
                <div className="text-sm text-purple-200">Player Level</div>
                <div className="text-xs mt-2">Total XP: {playerData?.totalXP}</div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex gap-2 bg-slate-800 p-2 rounded-xl">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${activeTab === 'dashboard' ? 'bg-purple-600' : 'hover:bg-slate-700'
              }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveTab('quests')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${activeTab === 'quests' ? 'bg-purple-600' : 'hover:bg-slate-700'
              }`}
          >
            🎯 Quests
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${activeTab === 'stats' ? 'bg-purple-600' : 'hover:bg-slate-700'
              }`}
          >
            📈 Stats
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {activeTab === 'dashboard' && (
          <Dashboard
            playerData={playerData}
            statConfig={statConfig}
            setSelectedStat={setSelectedStat}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'quests' && (
          <Quests
            playerData={playerData}
            setPlayerData={updatePlayerData}
            statConfig={statConfig}
            selectedStat={selectedStat}
            setSelectedStat={setSelectedStat}
            setShowLevelUp={setShowLevelUp}
          />
        )}

        {activeTab === 'stats' && (
          <Stats
            playerData={playerData}
            statConfig={statConfig}
          />
        )}
      </div>
    </div>
  );
}

export default App;