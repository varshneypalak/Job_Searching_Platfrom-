import ErrorHandler from "./error.js";

// OCP: Pass allowed roles — extend by adding roles, never modify this function
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} is not allowed to access this resource.`,
          403
        )
      );
    }
    next();
  };
};
