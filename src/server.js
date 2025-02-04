
import express from 'express';
import bodyParser from 'body-parser';
import configViewEngine from './config/viewEngine.js';
import initWebRoutes from './route/web.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('../.env')  });

const app = express();
configViewEngine(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


initWebRoutes(app);

const port = process.env.PORT ;
app.listen(port, () => {
  console.log(`backend is running on port ${port}`);
});
