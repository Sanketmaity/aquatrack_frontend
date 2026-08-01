import { NavLink, useNavigate } from "react-router-dom";
import { Droplets } from "lucide-react";

import { menuConfig } from "../../config/menuConfig";

export default function Sidebar({
  role = "SUPER_ADMIN",
}) {
  const navigate = useNavigate();

  // ==========================================
  // Navigation
  // ==========================================

  const menuItems =
    menuConfig?.[role]?.sidebar ??
    menuConfig.SUPER_ADMIN.sidebar;

  // ==========================================
  // Temporary User
  // (Replace after authentication)
  // ==========================================

  const currentUser = {
    name: "Sanket Maity",
    initials: "SM",
    role,
  };

  // ==========================================
  // Logout
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    navigate("/login");
  };

  return (
    <aside
      className="
        fixed
        left-0
        top-0

        z-50

        flex
        h-screen
        w-72
        flex-col

        overflow-hidden

        border-r
        border-slate-800/70

        bg-slate-900/95
        backdrop-blur-xl

        text-white

        shadow-2xl
      "
    >
      {/* ======================================
          Background Glow
      ====================================== */}

      <div className="pointer-events-none absolute -left-24 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

      {/* ======================================
          Logo
      ====================================== */}

      <div className="border-b border-slate-800/70 px-7 py-6">

        <div className="flex items-center gap-4">

          <div className="relative">

            <div className="absolute inset-0 rounded-xl bg-cyan-500 blur-md opacity-40" />

            <div
              className="
                relative

                flex
                h-12
                w-12
                items-center
                justify-center

                rounded-xl

                bg-gradient-to-tr
                from-blue-600
                to-cyan-500

                shadow-lg
                shadow-cyan-500/20
              "
            >
              <Droplets size={24} />
            </div>

          </div>

          <div>

            <h2
              className="
                bg-gradient-to-r
                from-white
                via-slate-100
                to-slate-300
                bg-clip-text
                text-xl
                font-bold
                tracking-wide
                text-transparent
              "
            >
              AquaTrack
            </h2>

            <div className="mt-1 flex items-center gap-2">

              <div className="relative">

                <span className="block h-2 w-2 rounded-full bg-emerald-400" />

                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />

              </div>

              <p className="text-xs text-slate-400">
                Enterprise Water Management
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ======================================
          Navigation
      ====================================== */}

      <nav
        className="
          flex-1
          overflow-y-auto

          px-4
          py-5

          space-y-1.5
        "
      >
        {menuItems.map((item) => {
          const Icon = item.icon;

          if (item.title === "Logout") {
            return (
              <button
                key={item.title}
                onClick={handleLogout}
                className="
                  group

                  flex
                  w-full
                  items-center
                  gap-3

                  rounded-xl

                  px-4
                  py-3

                  text-slate-400

                  transition-all

                  hover:bg-red-500/10
                  hover:text-red-400
                "
              >
                <Icon size={20} />

                <span className="text-sm font-medium">
                  Logout
                </span>
              </button>
            );
          }

          return (
            <NavLink
              key={item.title}
              to={item.path}
            >
              {({ isActive }) => (
                <div
                  className={`
                    group

                    relative

                    flex
                    items-center
                    gap-3

                    rounded-xl

                    border-l-4

                    px-4
                    py-3

                    transition-all
                    duration-300

                    ${
                      isActive
                        ? "border-cyan-400 bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/20"
                        : "border-transparent text-slate-300 hover:bg-slate-800 hover:text-white"
                    }
                  `}
                >
                  <Icon
                    size={20}
                    className={`
                      transition-all

                      ${
                        isActive
                          ? "scale-110"
                          : "group-hover:scale-110 group-hover:text-cyan-400"
                      }
                    `}
                  />

                  <span className="text-sm font-medium">
                    {item.title}
                  </span>

                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* ======================================
          Footer
      ====================================== */}

      <div className="border-t border-slate-800/70 bg-slate-950/40 p-4">

        <div className="flex items-center justify-between">

          <span className="text-xs text-slate-500">
            © {new Date().getFullYear()} AquaTrack
          </span>

          <span
            className="
              rounded-full

              border
              border-cyan-500/20

              bg-cyan-500/10

              px-2
              py-0.5

              text-[10px]
              font-semibold

              text-cyan-400
            "
          >
            Enterprise
          </span>

        </div>

      </div>

    </aside>
  );
}