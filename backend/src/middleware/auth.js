// backend/src/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];
      console.log('Token received:', token ? 'Token present' : 'No token');

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);

      // Find user - IMPORTANT: Check if your JWT payload uses 'id' or 'userId'
      // Based on your error, it might be looking for 'decoded.id' but your token might contain 'decoded.userId'
      const userId = decoded.id || decoded.userId || decoded._id;
      
      if (!userId) {
        console.error('No user ID found in token payload:', decoded);
        return res.status(401).json({ message: "Invalid token payload" });
      }

      req.user = await User.findById(userId).select("-password");
      
      if (!req.user) {
        console.error('User not found for ID:', userId);
        return res.status(401).json({ message: "User not found" });
      }

      console.log('User authenticated:', req.user._id, 'Role:', req.user.role);
      next();
      
    } catch (error) {
      console.error('Token verification error:', error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.log('No authorization header or invalid format');
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

export const adminOnly = (req, res, next) => {
  console.log('Checking admin access for user:', req.user?.role);
  
  if (req.user && req.user.role === "admin") {
    console.log('Admin access granted');
    next();
  } else {
    console.log('Admin access denied. User role:', req.user?.role);
    res.status(403).json({ message: "Admin access only" });
  }
};