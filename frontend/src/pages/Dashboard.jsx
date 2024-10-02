import React, { useState } from "react";
import CreateBlog from "../dashboard/CreateBlog";
import MyBlogs from "../dashboard/MyBlogs";
import MyProfile from "../dashboard/MyProfile";
import Sidebar from "../dashboard/Sidebar";
import UpdateBlog from "../dashboard/UpdateBlog";
import { useAuth } from "../context/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs");
  // console.log(profile);
  console.log(isAuthenticated);
 if (!isAuthenticated) {
     return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <Sidebar component={component} setComponent={setComponent} />
      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Blog" ? (
        <CreateBlog />
      ) : component === "Update Blog" ? (
        <UpdateBlog />
      ) : (
        <MyBlogs />
      )}
    </div>
  );
}

export default Dashboard;
