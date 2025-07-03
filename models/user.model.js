import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  userName: {
        type: String,
        trim: true,
        lowercase: true
    },
    full_name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    specialist: {
        type: [String],
        enum: ['male', 'female', 'kid'],
        default: []
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
     dob: {
        type: Date,
        default: null
    },
     password: {
        type: String,
        required:true,
        trim: true,
        
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  const user = this;

 
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10); 
    user.password = await bcrypt.hash(user.password, salt); 
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.options.toJSON = {
  transform: function (doc, ret) {
    delete ret.__v;
    delete ret.password;
    if (ret.dob) {
      ret.dob = ret.dob.toISOString().split("T")[0]; 
    }
    return ret;
  }
};
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
