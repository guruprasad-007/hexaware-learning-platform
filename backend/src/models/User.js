// backend/src/models/User.js (UPDATED with login tracking)
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    enrolledCourses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }],
    // Enhanced login history tracking
    loginHistory: [{
      type: Date,
      default: Date.now
    }],
    lastLogin: { type: Date },
    isActive: { type: Boolean, default: true },
    profile: {
      bio: String,
      avatar: String,
      dateOfBirth: Date,
      phone: String
    }
  },
  { timestamps: true }
);

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to record login
userSchema.methods.recordLogin = async function () {
  this.loginHistory.push(new Date());
  this.lastLogin = new Date();
  // Keep only last 100 login records to prevent bloating
  if (this.loginHistory.length > 100) {
    this.loginHistory = this.loginHistory.slice(-100);
  }
  await this.save();
};

// Virtual for login count
userSchema.virtual('loginCount').get(function() {
  return this.loginHistory.length;
});

// Virtual for days since last login
userSchema.virtual('daysSinceLastLogin').get(function() {
  if (!this.lastLogin) return null;
  const diffTime = Math.abs(new Date() - this.lastLogin);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Ensure virtual fields are included in JSON output
userSchema.set('toJSON', { virtuals: true });

const User = mongoose.model("User", userSchema);
export default User;