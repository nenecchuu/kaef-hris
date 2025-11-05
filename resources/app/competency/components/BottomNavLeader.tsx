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

/**
 * BottomNavLeader Component - Mobile Navigation for Leaders
 *
 * DESIGN DECISION: Primary color background with secondary color for active state
 * - Background: KF Blue (#003A78) for brand consistency and premium feel
 * - Active: KF Orange (#F39200) for visual contrast and energy
 * - Inactive: White with opacity for subtle appearance
 *
 * BOD BENEFIT: Professional, modern navigation that stands out from basic apps
 * UX IMPROVEMENT: Clear active state with high contrast for easy navigation
 */
export const BottomNavLeader = () => {
  const location = useLocation();

  return (
    <nav className="bg-kf-blue fixed bottom-0 left-0 right-0 z-50 shadow-2xl">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                "flex flex-1 flex-col items-center gap-1 py-3 transition-all duration-200",
                isActive
                  ? "border-t-4 border-kf-orange text-kf-orange bg-kf-blue-dark/30"
                  : "text-white/60 hover:text-white/80 hover:bg-kf-blue-dark/20",
              )}
            >
              <Icon
                size={24}
                className={clsx(
                  "transition-all",
                  isActive ? "text-kf-orange scale-110" : "text-white/70"
                )}
              />
              <span className={clsx(
                "text-xs font-medium transition-all",
                isActive ? "text-kf-orange" : "text-white/70"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
