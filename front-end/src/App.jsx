// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import DietPlans from "./pages/DietPlans.jsx";
import Progress from "./pages/Progress.jsx";
import GoPremium from "./pages/GoPremium.jsx";

import DashboardLayout from "./components/DashboardLayout.jsx";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED + LAYOUT SIDEBAR */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/diet-plans"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <DietPlans />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/progress"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Progress />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/go-premium"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <GoPremium />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        {/* ROOT & FALLBACK */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
