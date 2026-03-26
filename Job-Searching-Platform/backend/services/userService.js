import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const findUserByEmail = async (email) => {
  return User.findOne({ email });
};

export const findUserWithPassword = async (email) => {
  return User.findOne({ email }).select("+password");
};

export const createUser = async ({ name, email, phone, password, role }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ErrorHandler("Email already registered!", 400);
  }
  return User.create({ name, email, phone, password, role });
};

export const verifyCredentials = async (email, password, role) => {
  const user = await findUserWithPassword(email);
  if (!user) {
    throw new ErrorHandler("No account found with this email. Please register first!", 400);
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ErrorHandler("Incorrect password. Please try again.", 400);
  }
  if (user.role !== role) {
    throw new ErrorHandler(`This email is registered as ${user.role}, not ${role}.`, 404);
  }
  return user;
};
