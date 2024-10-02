import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Retrieve the JWT token from local storage
        let token = localStorage.getItem("jwt");
        // console.log("JWT Token:", token);

        // Check if the token is available
        if (token) {
          const { data } = await axios.get(
            "http://localhost:3000/api/users/getmyprofile",
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
              },
            }
          );

          // console.log("User Data:", data.user);
          setProfile(data.user);
          setIsAuthenticated(true);
        } else {
          console.log("No token found in localStorage.");
        }
      } catch (error) {
        console.log(
          "Error fetching profile:",
          error.response?.data || error.message
        );
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/blogs/getallblog"
        );
        // console.log("Blogs Data:", data);
        setBlogs(data);
      } catch (error) {
        console.log(
          "Error fetching blogs:",
          error.response?.data || error.message
        );
      }
    };

    fetchBlogs();
    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
