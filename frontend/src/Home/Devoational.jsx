import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Devoational() {
  const { blogs } = useAuth();
  const devotionalBlogs = blogs?.filter((blog) => blog.category === "Devotion");
  // console.log(devotionalBlogs);
  return (
    <div>
      <div className="container mx-auto my-12 p-4">
        <h1 className="font-semibold text-xl mb-6">Devotional</h1>
        <p className="text-center mb-8">
          The concept of gods varies widely across different cultures,
          religions, and belief systems
        </p>
        <div className="container mx-auto my-10 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6">
          {devotionalBlogs && devotionalBlogs.length > 0 ? (
            devotionalBlogs.slice(0, 8).map((element) => {
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
                </Link>
              );
            })
          ) : (
            <div className="flex h-screen items-center justify-center">
              Loading....
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Devoational;
