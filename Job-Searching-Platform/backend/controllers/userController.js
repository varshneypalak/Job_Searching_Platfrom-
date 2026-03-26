import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { sendToken } from "../utils/jwtToken.js";
import * as userService from "../services/userService.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const user = await userService.createUser(req.body);
  sendToken(user, 201, res, "User Registered!");
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  const user = await userService.verifyCredentials(email, password, role);
  sendToken(user, 200, res, "User Logged In!");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", { httpOnly: true, expires: new Date(Date.now()) })
    .json({ success: true, message: "Logged Out Successfully." });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ success: true, user: req.user });
});
