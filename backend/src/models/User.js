// backend/src/models/User.js
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
    // New field to track login history
    loginHistory: [{
      type: Date
    }]
  },
  { timestamps: true }
);
// ... rest of the model file remains the same
// ... rest of the model file remains the same
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

const User = mongoose.model("User", userSchema);
export default User;