import {
  IconBell,
  IconChartBar,
  IconDots,
  IconHome,
  IconUsers,
} from "@tabler/icons-react";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: IconHome, label: "Beranda", path: "/leader/home" },
  { icon: IconUsers, label: "Tim", path: "/leader/team" },
  { icon: IconChartBar, label: "Analisis", path: "/leader/analysis" },
  { icon: IconBell, label: "Notifikasi", path: "/leader/notifications" },
  { icon: IconDots, label: "Lainnya", path: "/leader/more" },
];

export const BottomNavLeader = () => {
  const location = useLocation();

  return (
    <nav className="bg-white fixed bottom-0 left-0 right-0 z-50 border-t-2 border-gray-300 shadow-2xl backdrop-blur-sm">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                "flex flex-1 flex-col items-center gap-1 py-2 transition",
                isActive
                  ? "border-t-2 border-kf-blue text-kf-blue"
                  : "text-gray-600 hover:text-gray-900",
              )}
            >
              <Icon
                size={24}
                className={isActive ? "text-kf-blue" : "text-gray-600"}
              />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
