import express from "express";
import { getAllBlogs,addBlog, updateBlog, getBlog, deleteBlog } from "../controllers/blogcontroller";
const blogRouter=express.Router();

blogRouter.get("/:id",getBlog);
blogRouter.get("/",getAllBlogs);
blogRouter.post("/add",addBlog);
blogRouter.put("/update/:id",updateBlog);
blogRouter.delete("/:id",deleteBlog);

export default blogRouter;