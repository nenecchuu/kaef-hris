import { Link } from "react-router-dom";

import { UnstyledButton } from "@src/components/button";
import { SCREEN_SIZE_MEDIUM } from "@src/constants/theme";
import { useWindowDimensions } from "@src/hooks/use-window-dimensions";
import { useAuth } from "@src/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@src/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@src/ui/dropdown-menu";

export function Navbar() {
  const { width } = useWindowDimensions();
  const { user, signOut } = useAuth();

  if (width < SCREEN_SIZE_MEDIUM) {
    return null;
  }

  return (
    <nav className="fixed z-10 h-15 w-screen bg-neutral-0 shadow-sm shadow-neutral-1000/5">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex" />

          <div className="hidden sm:ms-6 sm:flex sm:items-center">
            <div className="relative ms-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild={true}>
                  <div className="flex">
                    <Avatar size={32} className="mx-auto rounded-full">
                      <AvatarImage
                        src={user.avatar_path}
                        alt={`${user.name}'s logo`}
                      />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        className="bg-white inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                      >
                        {user.name}
                        <svg
                          className="-me-0.5 ms-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-32" align="end">
                  <DropdownMenuItem asChild={true}>
                    <Link className="hover:cursor-pointer" to={`./profile`}>
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild={true}>
                    <UnstyledButton
                      type="button"
                      onClick={signOut}
                      className="hover:cursor-pointer"
                    >
                      Sign Out
                    </UnstyledButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
