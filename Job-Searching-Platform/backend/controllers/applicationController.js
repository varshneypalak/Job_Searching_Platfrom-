import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import * as applicationService from "../services/applicationService.js";

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { name, email, coverLetter, phone, address, jobId } = req.body;
  const application = await applicationService.createApplication({
    name, email, coverLetter, phone, address, jobId,
    resumeFile: req.files.resume,
    userId: req.user._id,
  });
  res.status(201).json({ success: true, message: "Application Submitted!", application });
});

export const employerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const applications = await applicationService.findApplicationsByEmployer(req.user._id);
  res.status(200).json({ success: true, applications });
});

export const jobseekerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const applications = await applicationService.findApplicationsByJobSeeker(req.user._id);
  res.status(200).json({ success: true, applications });
});

export const jobseekerDeleteApplication = catchAsyncErrors(async (req, res, next) => {
  await applicationService.deleteApplicationById(req.params.id);
  res.status(200).json({ success: true, message: "Application Deleted!" });
});
