import ErrorHandler from "../middlewares/error.js";

export const validateRegister = (req, res, next) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form!", 400));
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email, password and role.", 400));
  }
  next();
};
