import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function Register() {
  const navigateTo = useNavigate(); //used to navigte

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [password, setPassword] = useState("");

  const changePhotoHandler = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);
    try {
      const { data } = await axios.post(
        "https://blogverse-ump1.onrender.com/api/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      localStorage.setItem("jwt", data.token); // storing token in localStorage so that if user refreshed the page it will not redirect again in login
      toast.success("user register successfully", { duration: 3000 });
      setName("");
      setEmail("");
      setEducation("");
      setPhone("");
      setPhoto("");
      setPhotoPreview("");
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
          <form onSubmit={handleRegister}>
            <div className="text-xl font-semibold text-center mb-3">
              Blog<span className="text-blue-700">Verse</span>
            </div>
            <h1 className="text-xl font-semibold mb-2">Register</h1>
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
              placeholder="Your Name"
              className="border w-full mb-4 p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your Email"
              className="border w-full mb-4 p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border w-full mb-4 p-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="password"
              placeholder="Your Password"
              className="border w-full mb-4 p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <select
              value={education}
              className="w-full p-2  border rounded-md mb-4"
              onChange={(e) => setEducation(e.target.value)}
            >
              <option value="user">Select Your Education</option>
              <option value="bca">BCA</option>
              <option value="mca">MCA</option>
              <option value="bba">BBA</option>
              <option value="mba">MBA</option>
            </select>
            <div className="flex space-x-5">
              <div className=" h-20 w-20 mr-4">
                <img
                  src={photoPreview ? `${photoPreview}` : "photo"}
                  alt="preview photo"
                />
              </div>
              <input
                onChange={changePhotoHandler}
                type="file"
                className="border w-full h-full mt-5"
              />
            </div>
            <p className="text-center mb-3">
              Already registered?{" "}
              <Link to={"/login"} className="text-blue-400">
                Login Now
              </Link>
            </p>
            <button
              className="w-full bg-blue-600 text-white p-2 rounded-md"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
