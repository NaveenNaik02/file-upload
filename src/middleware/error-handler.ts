import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

interface CustomError extends Error {
  statusCode: number;
}
const errorHandlerMiddleware = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || "Something went wrong try again",
  };
  if (error.name === "ValidationError") {
    customError.message = error.message;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  res.status(customError.statusCode).json({ message: customError.message });
};

export default errorHandlerMiddleware;
