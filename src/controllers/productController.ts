import { NextFunction, Request, Response } from "express";
import Product from "../models/Product";
import { StatusCodes } from "http-status-codes";

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({ products });
  } catch (error) {
    next(error);
  }
};

export { createProduct, getAllProducts };
