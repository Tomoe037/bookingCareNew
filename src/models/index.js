import SequelizeModule from "sequelize";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const { Sequelize, DataTypes } = SequelizeModule;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.resolve(__dirname, "../config/config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"))[
  process.env.NODE_ENV || "development"
];

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

const db = { sequelize, Sequelize, DataTypes };

const modelsPath = path.resolve(__dirname); 

fs.readdirSync(modelsPath)
  .filter((file) => file !== "index.js" && file.endsWith(".js"))
  .forEach(async (file) => {
    const modelModule = await import(`file://${path.join(modelsPath, file)}`);
    const model = modelModule.default(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
