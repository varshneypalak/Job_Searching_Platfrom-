import ErrorHandler from "../middlewares/error.js";

export const validatePostJob = (req, res, next) => {
  const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide full job details.", 400));
  }
  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(new ErrorHandler("Please either provide fixed salary or ranged salary.", 400));
  }
  if (salaryFrom && salaryTo && fixedSalary) {
    return next(new ErrorHandler("Cannot enter fixed and ranged salary together.", 400));
  }
  next();
};
