import express from "express";
import { uploadProductImage } from "../controllers/uploadController";
import {
  createProduct,
  getAllProducts,
} from "../controllers/productController";

const router = express.Router();

router.route("/").post(createProduct).get(getAllProducts);
router.route("/upload").post(uploadProductImage);

export default router;
