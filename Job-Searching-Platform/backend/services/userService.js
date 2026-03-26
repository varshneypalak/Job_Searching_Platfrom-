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
    throw new ErrorHandler("Invalid Email Or Password.", 400);
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ErrorHandler("Invalid Email Or Password.", 400);
  }
  if (user.role !== role) {
    throw new ErrorHandler(`User with provided email and ${role} not found!`, 404);
  }
  return user;
};
