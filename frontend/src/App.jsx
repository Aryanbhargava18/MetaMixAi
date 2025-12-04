// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home.jsx";
import Playground from "./pages/Playground.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import { ChatProvider } from "./Context/ChatContext";

const App = () => {
  return (
    <ChatProvider>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #334155',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Main Playground */}
        <Route path="/playground" element={<Playground />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Dashboard */}
        <Route path="/ai" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        {/* Catch-all 404 */}
        <Route
          path="*"
          element={
            <div className="p-10 text-center text-xl">
              404 — Page Not Found
            </div>
          }
        />
      </Routes>
    </ChatProvider>
  );
};

export default App;
