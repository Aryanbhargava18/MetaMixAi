import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../api";
import toast from "react-hot-toast";
import { ArrowLeft, MessageSquare, Image, FileText, Zap, Users, Settings } from "lucide-react";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const features = [
    {
      title: "AI Playground",
      description: "Interact with advanced AI models for conversations, coding assistance, and creative tasks.",
      icon: <MessageSquare className="w-8 h-8" />,
      path: "/playground",
      color: "from-blue-500 to-purple-600",
    },
    {
      title: "Generate Images",
      description: "Create custom images using AI-powered generation with various styles and themes.",
      icon: <Image className="w-8 h-8" />,
      path: "/generate-images",
      color: "from-green-500 to-teal-600",
    },
    {
      title: "Write Articles",
      description: "Generate high-quality articles, blog posts, and content with AI writing assistance.",
      icon: <FileText className="w-8 h-8" />,
      path: "/write-article",
      color: "from-orange-500 to-red-600",
    },
    {
      title: "Community Hub",
      description: "Connect with other users, share projects, and explore community-driven AI content.",
      icon: <Users className="w-8 h-8" />,
      path: "/community",
      color: "from-indigo-500 to-pink-600",
    },
    {
      title: "Resume Review",
      description: "Get AI-powered feedback on your resume to improve your job applications.",
      icon: <FileText className="w-8 h-8" />,
      path: "/review-resume",
      color: "from-yellow-500 to-orange-600",
    },
    {
      title: "Background Removal",
      description: "Remove backgrounds from images instantly using advanced AI technology.",
      icon: <Image className="w-8 h-8" />,
      path: "/remove-background",
      color: "from-purple-500 to-pink-600",
    },
  ];

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-6 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome back, <span className="text-blue-400">{user.username}</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Access your personalized workspace and explore innovative tools designed for productivity.
          </p>
        </div>

        {/* User Info */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg mb-10">
          <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-2xl font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{user.username}</h3>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Explore Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => navigate(feature.path)}
                className="group relative bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gray-600 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {feature.description}
                  </p>
                  <div className="text-blue-400 font-medium text-sm">
                    Get Started →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button */}
        <div className="text-center">
          <button
            onClick={logout}
            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
