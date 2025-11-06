import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob); // protected
router.route("/get").get(getAllJobs); // public
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs); // protected
router.route("/get/:id").get(getJobById); // public

export default router;

