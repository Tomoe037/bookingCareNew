
import express from 'express';
import bodyParser from 'body-parser';
import configViewEngine from './src/config/viewEngine.js';
import initWebRoutes from './src/route/web.js';
import { config } from 'dotenv';
import path from 'path';
import connectDB from './src/config/connectDB.js';

// dotenv.config({ path: path.resolve('.env') });
config()

const app = express();
configViewEngine(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


initWebRoutes(app);
connectDB();
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`backend is running on port ${port}`);
});
