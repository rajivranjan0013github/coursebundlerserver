import express from "express";
import {
  addToPlaylist,
  changePassword,
  deleteMyProfile,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
  removeFromPlaylist,
  resetPassword,
  updateProfile,
  updateProfilePicture,
  updateRole,
} from "../controllers/userController.js";
import { autherizedAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

//new user
router.route("/register").post(singleUpload, register);

// login
router.route("/login").post(login);

// logout
router.route("/logout").get(logout);

// Get my Profile
router.route("/me").get(isAuthenticated, getMyProfile);

// delete my profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

//Change Password
router.route("/changepassword").put(isAuthenticated, changePassword);

// update profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

//update profile picture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateProfilePicture);

// forgot password
router.route("/forgotpassword").post(forgotPassword);

// Reset password
router.route("/resetpassword/:token").put(resetPassword);

// Add to palylist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

// Remove from Playlist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

// Admin Routes...
router.route("/admin/users").get(isAuthenticated, autherizedAdmin, getAllUsers);

router
  .route("/admin/user/:id")
  .put(isAuthenticated, autherizedAdmin, updateRole)
  .delete(isAuthenticated, autherizedAdmin, deleteUser);

export default router;
