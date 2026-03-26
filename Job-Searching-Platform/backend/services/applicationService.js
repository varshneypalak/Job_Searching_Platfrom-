import { Application } from "../models/applicationSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { uploadFile } from "./uploadService.js";
import { findJobById } from "./jobService.js";

export const createApplication = async ({ name, email, coverLetter, phone, address, jobId, resumeFile, userId }) => {
  const resume = await uploadFile(resumeFile.tempFilePath);
  const jobDetails = await findJobById(jobId);

  return Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID: { user: userId, role: "Job Seeker" },
    employerID: { user: jobDetails.postedBy, role: "Employer" },
    resume,
  });
};

export const findApplicationsByEmployer = (userId) => {
  return Application.find({ "employerID.user": userId });
};

export const findApplicationsByJobSeeker = (userId) => {
  return Application.find({ "applicantID.user": userId });
};

export const deleteApplicationById = async (id) => {
  const application = await Application.findById(id);
  if (!application) throw new ErrorHandler("Application not found!", 404);
  await application.deleteOne();
};
