import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
} from "../controllers/orderControllers.js";
import { admin, protect } from "../middleware/authmiddleWare.js";

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);

router.route("/mine").get(protect, getMyOrders);

router.route("/:id").get(protect, getOrderById);
export default router;
