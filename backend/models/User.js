const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  xp: Number,
  difficulty: String,
  id: Number
});

const statSchema = new mongoose.Schema({
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  tasks: [taskSchema]
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: "Shadow Monarch"
  },
  level: {
    type: Number,
    default: 1
  },
  totalXP: {
    type: Number,
    default: 0
  },
  stats: {
    physique: { type: statSchema, default: () => ({}) },
    diet: { type: statSchema, default: () => ({}) },
    skin: { type: statSchema, default: () => ({}) },
    career: { type: statSchema, default: () => ({}) },
    relationship: { type: statSchema, default: () => ({}) },
    bodyLanguage: { type: statSchema, default: () => ({}) },
    charisma: { type: statSchema, default: () => ({}) },
    savings: { type: statSchema, default: () => ({}) }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);