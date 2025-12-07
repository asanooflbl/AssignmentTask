import { useState } from "react";
import { useAppContext } from "../Context/Authcontext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


function Login() {
  const { axios, navigate, setToken } = useAppContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/user/login", form);

      if (res.data.success) {
        toast.success("Login Successful");

        
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        axios.defaults.headers.common["Authorization"] = res.data.token;
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed: " + error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">

     
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          name="email"
          type="email"
          placeholder="email"
          value={form.email}
          onChange={handleChange}
        />

        <br />

        <input className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          name="password"
          type="password"
          placeholder="password"
          value={form.password}
          onChange={handleChange}
        />

        <br />

        <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition" type="submit">Login</button>
        <div>
          <p className="text-center mt-4">
            Don't have an account?{' '}<Link to="/signup" className="text-blue-600 hover:underline font-medium"> Signup</Link>
          </p>
        </div>
      </form>
       </div>
    </div>
  );
}

export default Login;
