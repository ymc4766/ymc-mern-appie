import express from "express";
import {
  allUsers,
  authUser,
  deleteUser,
  getUserProfile,
  logoutUser,
  register,
  updateUserProfile,
} from "../controllers/userControllers.js";
import { admin, protect } from "../middleware/authmiddleWare.js";

// import { admin, protect } from "../middleware/authmiddleware.js";

const app = express();

const router = express.Router();

router.route("/login").post(authUser);
router.route("/").post(register);

router.route("/").get(allUsers);
router.post("/logout", logoutUser);

router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/:id").delete(protect, admin, deleteUser);

export default router;
