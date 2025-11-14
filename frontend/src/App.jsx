import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import WriteArticle from "./pages/WriteArticle";
import GenerateImages from "./pages/GenerateImages";
import RemoveBackground from "./pages/RemoveBackground";
import RemoveObject from "./pages/RemoveObject";
import ReviewResume from "./pages/ReviewResume";
import Community from "./pages/Community";
import BlogTitle from "./pages/BlogTitle";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Tools */}
        <Route path="/write-article" element={<WriteArticle />} />
        <Route path="/blog-titles" element={<BlogTitle />} />
        <Route path="/generate-images" element={<GenerateImages />} />
        <Route path="/remove-background" element={<RemoveBackground />} />
        <Route path="/remove-object" element={<RemoveObject />} />
        <Route path="/review-resume" element={<ReviewResume />} />

        {/* Protected */}
        <Route
          path="/ai"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="community" element={<Community />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </div>
  );
}

export default App;
