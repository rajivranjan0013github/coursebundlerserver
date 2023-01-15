import express from "express";
import {
  addLectures,
  createCourse,
  deleteLecture,
  delteCourse,
  getAllCourses,
  getCourseLectures,
} from "../controllers/courseController.js";
import { autherizedAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();
// get all courses without lectures
router.route("/courses").get(getAllCourses);

// create new course only -- admin
router
  .route("/createcourse")
  .post(isAuthenticated, autherizedAdmin, singleUpload, createCourse);

//add lecture, delete lecture and get course details
router
  .route("/course/:id")
  .get(getCourseLectures)
  .post(isAuthenticated, autherizedAdmin, singleUpload, addLectures)
  .delete(isAuthenticated, autherizedAdmin, delteCourse);

router
  .route("/lecture")
  .delete(isAuthenticated, autherizedAdmin, deleteLecture);

export default router;
