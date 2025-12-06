// src/components/Layout.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        minHeight: "100vh",
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          padding: "1.5rem",
          borderRight: "1px solid #eee",
          background: "#f9fafb",
        }}
      >
        <div
          style={{
            fontSize: "1.4rem",
            fontWeight: 700,
            marginBottom: "1.5rem",
          }}
        >
          NutriPath
        </div>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: "2rem",
          }}
        >
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/diet-plans">Diet Plans</NavLink>
          <NavLink to="/progress">Progress</NavLink>
        </nav>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "auto",
            padding: "0.4rem 0.8rem",
            borderRadius: "0.4rem",
            border: "1px solid #ddd",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </aside>

      {/* KONTEN KANAN */}
      <main style={{ padding: "2rem" }}>
        <Outlet />
      </main>
    </div>
  );
}
