import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
    default: 'user'
  },
  profilePictureUrl: {
    type: String,
    default: 'https://placehold.co/100x100/E0E0E0/333333?text=User'
  },
  currentPoints: {
    type: Number,
    default: 0,
    min: 0
  },
  lastActivityDate: {
    type: Date
  },
  currentStreak: {
    type: Number,
    default: 0,
    min: 0
  },
  interests: [{
    type: String,
    trim: true
  }],
  badges: [{
    type: String,
    trim: true
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  courses: {
    all: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }],
    ongoing: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }],
    completed: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }]
  },
  progress: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    status: {
      type: String,
      enum: ['enrolled', 'in-progress', 'completed', 'dropped'],
      default: 'enrolled'
    },
    lastAccessedModule: {
      type: Number,
      min: 1
    },
    modulesProgress: [{
      moduleNumber: {
        type: Number,
        required: true,
        min: 1
      },
      completed: {
        type: Boolean,
        default: false
      },
      testAttempts: [{
        attemptDate: {
          type: Date,
          default: Date.now
        },
        score: {
          type: Number,
          min: 0,
          max: 100
        },
        questionsAttempted: [{
          questionNumber: {
            type: Number,
            required: true
          },
          userAnswer: {
            type: String
          },
          isCorrect: {
            type: Boolean
          },
          attempted: {
            type: Boolean,
            default: true
          }
        }]
      }]
    }]
  }],
  achievements: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Encrypt password before saving the user document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Add an index on the email field for faster queries
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

export default User;
