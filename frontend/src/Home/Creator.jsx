import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

function Creator() {
  const [admin, isAdmin] = useState();
  console.log(admin);

  useEffect(() => {
    const fetchAdmin = async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/users/admins",
        {
          withCredentials: true,
        }
      );
      console.log(data.admins);
      isAdmin(data.admins);
    };
    fetchAdmin();
  }, []);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Popular Creators</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-5 rounded-full my-5">
        {admin && admin.length > 0 ? (
          admin.slice(0, 6).map((element) => {
            return (
              <div key={element._id}>
                <div>
                  <img
                    src={element.photo.url}
                    alt="admin photo"
                    className="md:w-56 md:h-56 border border-black items-center object-cover rounded-full"
                  />
                  <div>
                    <p className="text-center md:ml-[-130px]">{element.name}</p>
                    <p className="text-gray-600 text-xs text-center md:ml-[-130px]">
                      {element.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h1>Loading.....</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Creator;
