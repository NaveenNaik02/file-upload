import express, { Request, Response } from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "./db/connect";
import productRouter from "./routes/productRoutes";
import errorHandlerMiddleware from "./middleware/error-handler";
import notFound from "./middleware/not-found";

dotenv.config();
const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(express.static("./public"));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.get("/", (_req: Request, res: Response) => {
  res.send("<h1>File Upload Starter</h1>");
});

app.use("/api/v1/products", productRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI!);
    app.listen(port, () =>
      console.log(`server is listening on port ${port}...`)
    );
  } catch (error) {
    console.error(error);
  }
};

start();
