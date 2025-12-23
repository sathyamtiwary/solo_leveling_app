// ============================================
// FILE: frontend/src/components/Auth.jsx
// ============================================
import React, { useState } from 'react';
import axios from 'axios';

function Auth({ onLogin, apiUrl }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const response = await axios.post(`${apiUrl}${endpoint}`, formData);
      
      onLogin(response.data.token, response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border-2 border-purple-500">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">⚔️ Solo Leveling</h1>
          <p className="text-gray-400">Level up your real life</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Hunter Name
              </label>
              <input
                type="text"
                placeholder="Shadow Monarch"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="hunter@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {error && (
            <div className="bg-red-900 bg-opacity-50 text-red-200 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? '⚡ Processing...' : (isLogin ? '🚀 Login' : '✨ Create Account')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-purple-400 hover:text-purple-300 text-sm"
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;