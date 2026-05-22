import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  learningResources: [{
    title: { type: String },
    url: { type: String },
    type: { type: String }
  }]
});

const quizQuestionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true }, // Index of the correct option (0-3)
  explanation: { type: String }
});

const moduleSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  durationDays: { type: Number, default: 5 },
  tasks: [taskSchema],
  quizzes: [quizQuestionSchema],
  quizScore: { type: Number, default: -1 }, // -1 = unattempted, 0-5 = score
  repoVerified: { type: Boolean, default: false }
});

const roadmapSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  domain: {
    type: String,
    enum: ['MERN', 'DSA', 'Cybersecurity', 'AI/ML', 'Data Analytics'],
    required: true
  },
  careerGoal: { type: String, required: true },
  skillLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  dailyStudyTime: { type: Number, required: true }, // Hours per day
  interests: [{ type: String }],
  existingSkills: [{ type: String }],
  progress: { type: Number, default: 0 },
  completedTasksCount: { type: Number, default: 0 },
  weakAreas: [{ type: String }],
  modules: [moduleSchema],
  createdAt: { type: Date, default: Date.now }
});

const Roadmap = mongoose.model('Roadmap', roadmapSchema);
export default Roadmap;
