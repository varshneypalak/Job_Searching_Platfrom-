import ErrorHandler from "../middlewares/error.js";

const ALLOWED_FORMATS = ["image/png", "image/jpeg", "image/webp"];

export const validatePostApplication = (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume File Required!", 400));
  }
  if (!ALLOWED_FORMATS.includes(req.files.resume.mimetype)) {
    return next(new ErrorHandler("Invalid file type. Please upload PNG, JPEG or WebP.", 400));
  }
  const { name, email, coverLetter, phone, address, jobId } = req.body;
  if (!name || !email || !coverLetter || !phone || !address || !jobId) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }
  next();
};
