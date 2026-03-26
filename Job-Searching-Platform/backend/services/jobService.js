import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const findAllActiveJobs = () => Job.find({ expired: false });

export const findJobById = async (id) => {
  const job = await Job.findById(id);
  if (!job) throw new ErrorHandler("Job not found.", 404);
  return job;
};

export const findJobsByUser = (userId) => Job.find({ postedBy: userId });

export const createJob = (data, userId) => {
  return Job.create({ ...data, postedBy: userId });
};

export const updateJobById = async (id, data) => {
  const job = await Job.findById(id);
  if (!job) throw new ErrorHandler("Job not found.", 404);
  return Job.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

export const deleteJobById = async (id) => {
  const job = await Job.findById(id);
  if (!job) throw new ErrorHandler("Job not found.", 404);
  await job.deleteOne();
};
