import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus, toggleSaveJob, getSavedJobs } from "../controllers/application.controller.js";
 
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);
router.route("/save/:id").post(isAuthenticated, toggleSaveJob);
router.route("/saved").get(isAuthenticated, getSavedJobs);
 

export default router;

