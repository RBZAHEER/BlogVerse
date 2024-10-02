import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigateTo = useNavigate(); //used to navigte

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/users/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      localStorage.setItem("jwt", data.token); // storing token in localStorage so that if user refreshed the page it will not redirect again in login
      toast.success("user Login successfully", { duration: 3000 });
      setEmail("");
      setRole("");
      setPassword("");
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message, { duration: 3000 });
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <form onSubmit={handleLogin}>
            <div className="text-xl font-semibold text-center mb-3">
              Blog<span className="text-blue-700">Verse</span>
            </div>
            <h1 className="text-xl font-semibold mb-2">Login</h1>
            <select
              className="w-full p-2 border rounded-md mb-4"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Select Role</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
            <input
              type="text"
              placeholder="Your Email"
              className="border w-full mb-4 p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Your Password"
              className="border w-full mb-4 p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <p className="text-center mb-3">
              Don't have an account ?{" "}
              <Link to={"/register"} className="text-blue-400">
                Register Now
              </Link>
            </p>
            <button
              className="w-full bg-blue-600 text-white p-2 rounded-md"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
