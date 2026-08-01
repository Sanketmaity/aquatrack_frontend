import { NavLink } from "react-router-dom";
import { menuConfig } from "../../config/menuConfig";

export default function MobileBottomNav({
  role = "SUPER_ADMIN",
}) {
  // ==========================================
  // User
  // ==========================================

  const email =
    localStorage.getItem("email") ??
    "guest@aquatrack.com";

  const userName = email
    .split("@")[0]
    .replaceAll(".", " ");

  const initials = userName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // ==========================================
  // Menu
  // ==========================================

  const items =
    menuConfig?.[role]?.bottomNav ??
    menuConfig.SUPER_ADMIN.bottomNav;

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50

        border-t
        border-slate-200/80

        bg-white/95
        backdrop-blur-xl

        shadow-[0_-10px_30px_rgba(15,23,42,0.08)]

        lg:hidden
      "
    >
      <div className="grid h-16 grid-cols-4 px-2">

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
            >
              {({ isActive }) => (
                <div
                  className={`
                    flex
                    h-14
                    w-full
                    flex-col
                    items-center
                    justify-center

                    rounded-xl

                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-cyan-50 text-cyan-600"
                        : "text-slate-500 hover:text-cyan-600"
                    }
                  `}
                >
                  {/* Profile */}

                  {item.title === "Profile" ? (

                    <div
                      className={`
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center

                        rounded-full

                        text-[11px]
                        font-bold

                        transition-all

                        ${
                          isActive
                            ? "bg-cyan-600 text-white"
                            : "bg-slate-200 text-slate-700"
                        }
                      `}
                    >
                      {initials}
                    </div>

                  ) : (

                    <Icon
                      size={21}
                      strokeWidth={isActive ? 2.6 : 2}
                    />

                  )}

                  <span
                    className={`
                      mt-1

                      text-[10px]
                      font-semibold

                      leading-none

                      ${
                        isActive
                          ? "text-cyan-600"
                          : "text-slate-500"
                      }
                    `}
                  >
                    {item.title}
                  </span>

                </div>
              )}
            </NavLink>
          );
        })}

      </div>
    </nav>
  );
}