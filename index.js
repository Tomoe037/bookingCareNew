import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./src/config/viewEngine.js";
import initWebRoutes from "./src/route/web.js";
import { config } from "dotenv";
import path from "path";
import connectDB from "./src/config/connectDB.js";
import cors from "cors";
// dotenv.config({ path: path.resolve('.env') });
config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Cho phép frontend kết nối
    credentials: true, // Bắt buộc để gửi cookie/session
  })
);
configViewEngine(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);
connectDB();
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`backend is running on port ${port}`);
});
