import { useEffect, useState } from "react";
import { getCurrentUser } from "../api";
import toast from "react-hot-toast";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in first!");
      window.location.href = "/login";
      return;
    }

    const fetchUser = async () => {
      const data = await getCurrentUser(token);

      if (!data.user) {
        toast.error("Session expired! Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      setUser(data.user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out!");
    window.location.href = "/login";
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Dashboard</h2>

        <div className="bg-gray-700 p-4 rounded-lg text-center">
          <h3 className="text-xl font-semibold">{user.username}</h3>
          <p className="text-gray-300">{user.email}</p>
        </div>

        <button
          onClick={logout}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
