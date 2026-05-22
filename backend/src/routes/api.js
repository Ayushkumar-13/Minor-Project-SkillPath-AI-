import express from 'express';
import { registerUser, authUser, getMe } from '../controllers/authController.js';
import { generateRoadmap, getMyRoadmap, toggleTaskCompletion, submitQuizScore, refreshModuleQuiz } from '../controllers/roadmapController.js';
import { validateRepository } from '../controllers/githubController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// --- Authentication Routes ---
router.post('/auth/signup', registerUser);
router.post('/auth/login', authUser);
router.get('/auth/me', protect, getMe);

// --- Roadmap Generation & Operation Routes ---
router.post('/roadmaps/generate', protect, generateRoadmap);
router.get('/roadmaps/me', protect, getMyRoadmap);
router.post('/roadmaps/:id/tasks/toggle', protect, toggleTaskCompletion);
router.post('/roadmaps/:id/quizzes/submit', protect, submitQuizScore);
router.post('/roadmaps/:id/modules/:moduleId/quizzes/refresh', protect, refreshModuleQuiz);

// --- GitHub Verification Routes ---
router.post('/github/validate', protect, validateRepository);

export default router;
