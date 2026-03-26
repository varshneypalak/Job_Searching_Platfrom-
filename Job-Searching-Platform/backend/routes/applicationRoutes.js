import express from "express";
import { postApplication, employerGetAllApplications, jobseekerGetAllApplications, jobseekerDeleteApplication } from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";
import { validatePostApplication } from "../validators/applicationValidator.js";

const router = express.Router();

router.post("/post", isAuthenticated, authorize("Job Seeker"), validatePostApplication, postApplication);
router.get("/employer/getall", isAuthenticated, authorize("Employer"), employerGetAllApplications);
router.get("/jobseeker/getall", isAuthenticated, authorize("Job Seeker"), jobseekerGetAllApplications);
router.delete("/delete/:id", isAuthenticated, authorize("Job Seeker"), jobseekerDeleteApplication);

export default router;
