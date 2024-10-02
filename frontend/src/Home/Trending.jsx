import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Trending() {
  const { blogs } = useAuth();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Trending</h1>
      <Carousel responsive={responsive}>
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 6).map((element) => {
            return (
              <div className="p-4 bg-white border border-gray-400 rounded-lg shadow-md mx-2">
                <Link
                  to={`/blogs/${element._id}`}
                  key={element._id}
                  className="bg-white rounded-lg"
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
                    <p className="ml-3 font-semibold text-xl text-gray-400">
                      {element.adminName}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="flex h-screen items-center justify-center">
            Loading....
          </div>
        )}
      </Carousel>
    </div>
  );
}

export default Trending;
