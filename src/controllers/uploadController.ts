import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors/index";
import { UploadedFile } from "express-fileupload";
import { StatusCodes } from "http-status-codes";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";

const uploadProductImageLocal = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files) {
      throw new BadRequestError("No File Uploaded");
    }
    const productImage = req.files.image as UploadedFile;
    if (!productImage.mimetype.startsWith("image")) {
      throw new BadRequestError("Please Upload Image");
    }
    const maxSize = 1024 * 1024;
    if (productImage.size > maxSize) {
      throw new BadRequestError("Please upload image smaller than 1MB");
    }
    const imagePath = path.join(
      __dirname,
      "../../public/uploads/" + productImage.name
    );
    await productImage.mv(imagePath);
    return res
      .status(StatusCodes.OK)
      .json({ image: { src: `/uploads/${productImage.name}` } });
  } catch (error) {
    next(error);
  }
};

const uploadProductImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filePath = req.files.image;
    if (Array.isArray(filePath)) {
      throw new BadRequestError("User can upload one file at a time");
    }
    const result = await cloudinary.uploader.upload(filePath.tempFilePath, {
      use_filename: true,
      folder: "file-upload",
    });
    fs.unlinkSync(filePath.tempFilePath);
    res.status(StatusCodes.OK).json({
      image: { src: result.secure_url },
    });
  } catch (error) {
    next(error);
  }
};

export { uploadProductImage };
