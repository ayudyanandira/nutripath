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
    <div className="app-layout bg-slate-100">
      {/* Sidebar kiri */}
      <aside className="sidebar">
        <div className="logo">NutriPath</div>

        <nav className="nav">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " active" : "")
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " active" : "")
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/diet-plans"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " active" : "")
            }
          >
            Diet Plans
          </NavLink>
          <NavLink
            to="/progress"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " active" : "")
            }
          >
            Progress
          </NavLink>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* Area konten kanan */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
