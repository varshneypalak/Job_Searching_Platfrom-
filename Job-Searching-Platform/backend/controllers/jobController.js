import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import * as jobService from "../services/jobService.js";

export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await jobService.findAllActiveJobs();
  res.status(200).json({ success: true, jobs });
});

export const postJob = catchAsyncErrors(async (req, res, next) => {
  const job = await jobService.createJob(req.body, req.user._id);
  res.status(201).json({ success: true, message: "Job Posted Successfully!", job });
});

export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const myJobs = await jobService.findJobsByUser(req.user._id);
  res.status(200).json({ success: true, myJobs });
});

export const updateJob = catchAsyncErrors(async (req, res, next) => {
  await jobService.updateJobById(req.params.id, req.body);
  res.status(200).json({ success: true, message: "Job Updated!" });
});

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  await jobService.deleteJobById(req.params.id);
  res.status(200).json({ success: true, message: "Job Deleted!" });
});

export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const job = await jobService.findJobById(req.params.id);
  res.status(200).json({ success: true, job });
});
