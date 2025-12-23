# solo_leveling_app

# 🎮 Solo Leveling Life System

A gamified personal development app inspired by Solo Leveling. Track your real-life progress across 8 core attributes: Physique, Diet, Skin Care, Career, Relationships, Body Language, Charisma, and Savings.

## 🚀 Features

- **8 Core Attributes** with individual leveling systems
- **Quest System** - Create custom daily tasks
- **XP & Leveling** - Earn XP and level up like an RPG
- **Rank System** - Progress from E-Rank to Shadow Monarch
- **User Authentication** - Secure login/signup
- **Cloud Sync** - Your progress saved to database
- **Responsive Design** - Works on desktop and mobile

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS
- Axios
- Lucide React Icons

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Clone Repository
```bash
git clone https://github.com/yourusername/solo-leveling-app.git
cd solo-leveling-app
```

### Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your API URL
npm run dev
```

Visit `http://localhost:5173`

## 🌐 Deployment

### Backend (Render.com)
1. Create account on [Render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Root Directory: `backend`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add environment variables

### Frontend (Vercel)
1. Create account on [Vercel.com](https://vercel.com)
2. Import GitHub repository
3. Root Directory: `frontend`
4. Framework: Vite
5. Add environment variable: `VITE_API_URL`
6. Deploy

## 📱 Usage

1. **Sign Up** - Create your hunter account
2. **Dashboard** - View all 8 attributes at a glance
3. **Create Quests** - Add daily tasks for each attribute
4. **Complete Quests** - Earn XP and level up
5. **Track Progress** - Watch your stats grow over time

## 🎯 Attribute System

- **Physique** 💪 - Strength & Fitness
- **Diet** 🍎 - Nutrition & Health
- **Skin Care** ✨ - Grooming & Appearance
- **Career** 💼 - Skills & Job Growth
- **Relationships** ❤️ - Social Connections
- **Body Language** 🎭 - Presence & Posture
- **Charisma** ⭐ - Influence & Charm
- **Savings** 💰 - Financial Growth

## 🏆 Rank System

- E-Rank Hunter (Level 1-9)
- B-Rank Hunter (Level 10-19)
- A-Rank Hunter (Level 20-29)
- S-Rank Hunter (Level 30-39)
- National Hunter (Level 40-49)
- Shadow Monarch (Level 50+)

## 🔒 Security

- Passwords hashed with bcrypt
- JWT tokens for authentication
- HTTP-only cookies (optional)
- Environment variables for secrets

## 🤝 Contributing

Pull requests welcome! For major changes, open an issue first.

## 📄 License

MIT

## 💬 Support

For issues and questions, open a GitHub issue.

---

**Start your leveling journey today!** ⚔️
