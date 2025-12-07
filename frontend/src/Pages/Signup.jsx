import React, { useState } from "react";
import { useAppContext } from "../Context/Authcontext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Signup() {
  const { axios, navigate,setToken } = useAppContext();

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/user/signup", input);

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token); 
        setToken(data.token);
        axios.defaults.headers.common["Authorization"] = data.token;
        toast.success("Signup Successful");
        navigate("/login");
      } else {
        toast.error(data.message || "Signup failed. Please try again." );
      }
    } catch (err) {
      toast.error("Signup failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
         type="text" name="username" placeholder="username" value={input.username} onChange={handleChange}/><br/>

        <input className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500" 
         type="email" name="email" placeholder="email" value={input.email} onChange={handleChange}/><br/>

        <input className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          type="password" name="password" placeholder="password" value={input.password} onChange={handleChange}/><br/>

        <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition" type="submit">Signup</button>
        <div>
          <p className="text-center mt-4">
           Already have an account?{' '}<Link to="/login" className="text-blue-600 hover:underline font-medium">Login</Link>
          </p>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Signup;
