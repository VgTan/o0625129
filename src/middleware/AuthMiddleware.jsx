import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext"; // kalau pakai context

export const AuthMiddleware = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export const LoggedInMiddleware = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (user) return <Navigate to="/game" replace />;
  return children;
};

export const RoleMiddleware = ({ children }) => {
  const { user, userData, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (user && userData?.role === "admin")
    return <Navigate to="/dashboard" replace />;
  return children;
};

export const IsAdmin = ({ children }) => {
  const { user, userData, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user || userData?.role !== "admin")
    return <Navigate to="/" replace />;
  return children;
};
