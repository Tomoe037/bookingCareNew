import express from "express";
import path from "path";
import { fileURLToPath } from "url";  

const __dirname = path.dirname(fileURLToPath(import.meta.url));  // ✅ Fix lỗi Windows

const configViewEngine = (app) => {
  app.use(express.static(path.join(__dirname, "../public")));  // ✅ Đảm bảo file tĩnh hoạt động
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "../views"));  // ✅ Đảm bảo đường dẫn đúng

  console.log("✅ Views directory set to:", path.join(__dirname, "../views"));
};

export default configViewEngine;
