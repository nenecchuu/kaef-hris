import * as React from "react";
import {
  IconCalendar,
  IconClock,
  IconCloud,
  IconMoon,
  IconSun,
} from "@tabler/icons-react";

import { useAuth } from "@src/lib/auth";
import { View } from "@src/ui/view";

export function HomeRootPage() {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) {
      return { text: "Selamat Pagi", icon: IconSun, color: "text-yellow-600" };
    } else if (hour < 17) {
      return {
        text: "Selamat Siang",
        icon: IconCloud,
        color: "text-orange-500",
      };
    } else {
      return { text: "Selamat Malam", icon: IconMoon, color: "text-blue-600" };
    }
  };

  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;

  return (
    <View>
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-8">
        {/* Welcome Section */}
        <div className="space-y-4 text-center">
          <div
            className={`flex items-center justify-center space-x-3 ${greeting.color}`}
          >
            <GreetingIcon size={48} />
            <h2 className="text-4xl font-bold">{greeting.text}!</h2>
          </div>
          <p className="text-xl text-gray-600">
            Selamat datang kembali,{" "}
            <span className="font-semibold text-gray-800">{user?.name}</span>
          </p>
        </div>

        {/* Time and Date Display */}
        <div className="bg-white min-w-[400px] rounded-2xl border border-gray-100 p-8 shadow-lg">
          <div className="space-y-6">
            {/* Current Time */}
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center space-x-3">
                <IconClock size={32} className="text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Waktu Saat Ini
                </h2>
              </div>
              <div className="font-mono text-5xl font-bold tracking-wider text-blue-600">
                {formatTime(currentTime)}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                WIB (Waktu Indonesia Barat)
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Current Date */}
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center space-x-3">
                <IconCalendar size={32} className="text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Tanggal Hari Ini
                </h2>
              </div>
              <div className="text-2xl font-semibold text-green-600">
                {formatDate(currentTime)}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-2 text-center">
          <p className="text-gray-600">
            Semoga hari Anda produktif dan menyenangkan!
          </p>
        </div>
      </div>
    </View>
  );
}
