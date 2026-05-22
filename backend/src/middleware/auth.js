import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'skillpath_cyberpunk_jwt_secret_key_2026');

      // Attempt to find user, or fallback if DB is offline or mock
      let user;
      try {
        user = await User.findById(decoded.id).select('-password');
      } catch (dbErr) {
        console.log('⚠️ DB query failed in auth protect, falling back to decoded payload user');
      }

      if (!user) {
        // Fallback user object in case MongoDB is offline during local test
        req.user = { _id: decoded.id, name: decoded.name || 'Developer', email: decoded.email };
      } else {
        req.user = user;
      }

      next();
    } catch (error) {
      console.error(`JWT Auth Middleware Error: ${error.message}`);
      res.status(401).json({ message: 'Not authorized, token validation failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};
