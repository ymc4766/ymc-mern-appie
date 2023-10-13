import express from "express";
import {
  allProducts,
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../controllers/productControllers.js";
import { admin, protect } from "../middleware/authmiddleWare.js";

// import { admin, protect } from "../middleware/authmiddleware.js";

const app = express();

const router = express.Router();

router.route("/").get(allProducts);
router.route("/:id").get(getProduct);
router.route("/create").post(createProduct);

router
  .route("/:id")
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
// router.route("/products/:id/reviews").post(protect, createProductReview);
export default router;
