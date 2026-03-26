import express from "express";
import { getAllJobs, getSingleJob, postJob, updateJob, deleteJob, getMyJobs } from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";
import { validatePostJob } from "../validators/jobValidator.js";

const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/post", isAuthenticated, authorize("Employer"), validatePostJob, postJob);
router.get("/getmyjobs", isAuthenticated, authorize("Employer"), getMyJobs);
router.put("/update/:id", isAuthenticated, authorize("Employer"), updateJob);
router.delete("/delete/:id", isAuthenticated, authorize("Employer"), deleteJob);
router.get("/:id", isAuthenticated, getSingleJob);

export default router;
