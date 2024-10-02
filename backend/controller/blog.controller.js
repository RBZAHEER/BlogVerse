import { Blog } from "../model/blog.model.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose, { mongo } from "mongoose";

//Create Blog
export const createBlog = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Blog Photo is not uploaded" });
    }
    const { blogImage } = await req.files;
    const allowedFormat = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/avif",
      "image/webp",
    ];
    if (!allowedFormat.includes(blogImage.mimetype)) {
      return res
        .status(400)
        .json({ message: "Only jpg , jpeg , avif , webp & png are allowed" });
    }

    let { title, category, about } = req.body;
    if (!title || !category || !about) {
      return res.status(400).json({ message: "All feilds are required" });
    }

    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo?.url;
    const createdBy = req?.user?._id;
    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
    }
    const blogData = {
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    };

    const blog = await Blog.create(blogData);

    res.status(200).json({ message: "Blog created successfully", blog });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

//Delete Blog
export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  //   console.log(blog);
  if (!blog) {
    return res.status(400).json({ error: "Blog is not found" });
  }
  await blog.deleteOne();
  res.status(200).json({ message: "Blog deleted successfully" });
};

//GetAllBlogs
export const getAllBlogs = async (req, res) => {
  const allBlogs = await Blog.find();
  if (!allBlogs) {
    res.status(400).json({ error: "Not found any Blog" });
  }
  res.status(200).json(allBlogs);
};

//GetSingleBlogs
export const getSingleBlogs = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }
  const singleBlog = await Blog.findById(id);
  if (!singleBlog) {
    return res.status(400).json({ error: "Blog not Found" });
  }
  res.status(200).json(singleBlog);
};

//GetMyBlogs
export const getMyBlogs = async (req, res) => {
  const createdBy = req.user._id;
  const myBlogs = await Blog.find({ createdBy });
  if (!myBlogs) {
    res.status(400).json({ error: "There is no Blogs" });
  }
  res.status(200).json(myBlogs);
};

//UpdateBlogs
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Blog id" });
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedBlog) {
    return res.status(404).json({ error: "Blog not Found" });
  }
  res.status(200).json(updatedBlog);
};
