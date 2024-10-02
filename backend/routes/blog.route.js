import express, { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getMyBlogs,
  getSingleBlogs,
  updateBlog,
} from "../controller/blog.controller.js";
import { isAuthenticated, isAdmin } from "../middleware/authUser.js";
const router = express.Router();

router.post("/createblog", isAuthenticated, isAdmin("admin"), createBlog);
router.delete("/deleteblog/:id", isAuthenticated, isAdmin("admin"), deleteBlog);
router.get("/getallblog", getAllBlogs);
router.get("/getsingleblog/:id", isAuthenticated, getSingleBlogs);
router.get("/getmyblog", isAuthenticated, isAdmin("admin"), getMyBlogs);
router.put("/update/:id", isAuthenticated, isAdmin("admin"), updateBlog);
export default router;
