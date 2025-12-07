import React from "react";

export default function Dashboard() {
   let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6 text-center">

     
      <h1 className="text-2xl font-semibold mb-4">Welcome, {user?.username}</h1>
       <button
          onClick={handleLogout}
          className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">Logout </button>
       </div>
    </div>
  );
}
