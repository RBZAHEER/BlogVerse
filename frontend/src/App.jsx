import React from "react";
import { Navigate, Route, Routes, useLocation, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Blogs from "./pages/Blogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Creators from "./pages/Creators";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Detail";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Home from "./components/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import { useAuth } from "./context/AuthProvider";
import UpdateBlog from "./dashboard/UpdateBlog";
function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(
    location.pathname
  );
  const { blogs } = useAuth(); // Destructure blogs from useAuth()
  //   console.log(blogs);

  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/creators" element={<Creators />} />
        <Route exact path="/details" element={<Details />} />
        {/* Hide Navbar for this three pages */}
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="blog/update/:id" element={<UpdateBlog />} />
        <Route exact path="blogs/:id" element={<Details />} />
      </Routes>
      <Toaster />

      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
