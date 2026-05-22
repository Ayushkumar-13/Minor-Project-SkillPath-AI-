import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// In-Memory Backup Store for resilient offline operation
const memoryUsers = [];

const generateToken = (id, name, email) => {
  return jwt.sign(
    { id, name, email },
    process.env.JWT_SECRET || 'skillpath_cyberpunk_jwt_secret_key_2026',
    { expiresIn: '30d' }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // 1. Try DB registration
    let userExists = false;
    try {
      userExists = await User.findOne({ email });
    } catch (err) {
      console.log('⚠️ DB offline, checking memory store instead');
      userExists = memoryUsers.some(u => u.email === email.toLowerCase());
    }

    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    let newUser;
    let userId;

    try {
      newUser = await User.create({ name, email, password });
      userId = newUser._id;
    } catch (err) {
      console.log('⚠️ DB write failed, simulating in memory');
      // Simulate MongoDB document creation
      userId = 'mem_' + Math.random().toString(36).substr(2, 9);
      newUser = {
        _id: userId,
        name,
        email: email.toLowerCase(),
        password, // stored plain for mock but compared easily
        streak: 0,
        lastActive: new Date(),
        createdAt: new Date()
      };
      memoryUsers.push(newUser);
    }

    res.status(201).json({
      _id: userId,
      name: newUser.name,
      email: newUser.email,
      streak: newUser.streak,
      token: generateToken(userId, newUser.name, newUser.email)
    });

  } catch (error) {
    console.error(`Signup error: ${error.message}`);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // 1. Try DB validation
    let user;
    let isMatch = false;

    try {
      user = await User.findOne({ email });
      if (user) {
        isMatch = await user.matchPassword(password);
      }
    } catch (err) {
      console.log('⚠️ DB query failed on login, checking memory store instead');
      user = memoryUsers.find(u => u.email === email.toLowerCase());
      if (user) {
        isMatch = user.password === password; // simplified mock verification
      }
    }

    if (user && isMatch) {
      // Update streak and lastActive upon successful login
      const now = new Date();
      const oneDay = 24 * 60 * 60 * 1000;
      
      try {
        const lastActiveDate = new Date(user.lastActive);
        const timeDiff = now.getTime() - lastActiveDate.getTime();
        
        if (timeDiff > oneDay && timeDiff < oneDay * 2) {
          user.streak += 1;
        } else if (timeDiff >= oneDay * 2) {
          user.streak = 1; // reset streak if inactive for > 2 days
        } else if (user.streak === 0) {
          user.streak = 1; // initial login streak
        }
        
        user.lastActive = now;
        await user.save();
      } catch (streakErr) {
        console.log('⚠️ Streak count update skipped (simulated/offline mode)');
        const lastActiveDate = new Date(user.lastActive);
        const timeDiff = now.getTime() - lastActiveDate.getTime();
        if (timeDiff > oneDay && timeDiff < oneDay * 2) {
          user.streak += 1;
        } else if (timeDiff >= oneDay * 2) {
          user.streak = 1;
        } else if (user.streak === 0) {
          user.streak = 1;
        }
        user.lastActive = now;
      }

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        streak: user.streak,
        token: generateToken(user._id, user.name, user.email)
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

  } catch (error) {
    console.error(`Login error: ${error.message}`);
    res.status(500).json({ message: 'Server error during login authentication' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    let user;
    try {
      user = await User.findById(req.user._id).select('-password');
    } catch (err) {
      console.log('⚠️ DB query failed on profile, fetching mock user');
    }

    if (!user) {
      user = memoryUsers.find(u => u._id === req.user._id.toString()) || req.user;
    }

    res.json(user);
  } catch (error) {
    console.error(`Profile error: ${error.message}`);
    res.status(500).json({ message: 'Server error retrieving user details' });
  }
};

// Expose memory users helper for local mocking inside other controllers
export const getMockUser = (id) => memoryUsers.find(u => u._id === id);
