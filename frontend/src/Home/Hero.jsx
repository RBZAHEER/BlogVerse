import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Hero() {
  const { blogs } = useAuth();
  // console.log(blogs);
  return (
    <div className="container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {blogs && blogs.length > 0 ? (
        blogs.slice(0, 4).map((element) => {
          return (
            <Link
              to={`/blogs/${element._id}`}
              key={element._id}
              className="bg-white rounded-lg hover:shadow-lg transform overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div className="group relative">
                <img
                  src={element.blogImage.url}
                  alt="Blog img"
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300"></div>
                <h1 className="absolute bottom-3 text-white font-semibold ml-2 group-hover:text-yellow-500 duration-300">
                  {element.title}
                </h1>
              </div>
              <div className="flex items-center gap-2 p-4">
                <img
                  src={element.adminPhoto}
                  alt="writer photo"
                  className="w-12 h-12 rounded-full border-2 border-yellow-400"
                />
                <p className=" font-semibold text-xl text-gray-400">
                  {element.adminName}
                </p>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="flex h-screen items-center justify-center">
          Loading....
        </div>
      )}
    </div>
  );
}

export default Hero;
