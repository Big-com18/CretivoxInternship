import Image from "next/image";
import { UserData } from "@/types";

interface NavBarProps {
  userData: UserData | null;
}

export default function NavBar({ userData }: NavBarProps) {
  const isLoggedIn = userData !== null;

  return (
    <nav className="absolute top-0 right-0 w-full p-6 md:p-10 flex justify-between items-center z-50">
      {/* Profile badge */}
      <div className="hero-elem profile-badge flex items-center gap-3 bg-zinc-900/80 px-4 py-2 rounded-full border border-zinc-800 shadow-xl backdrop-blur-md transition-all duration-300">
        {isLoggedIn && userData ? (
          <>
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-red-500 bg-white shrink-0">
              <Image
                src={userData.image}
                alt={userData.firstName}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="hidden md:flex flex-col pr-2 text-left">
              <span className="text-xs text-zinc-400 leading-none">Authenticated as</span>
              <span className="text-sm font-bold text-zinc-100 mt-0.5">
                {userData.firstName} {userData.lastName}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full border-2 border-zinc-700 bg-zinc-800 flex items-center justify-center shrink-0 text-zinc-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <div className="hidden md:flex flex-col pr-2 text-left">
              <span className="text-xs text-zinc-500 leading-none">Status</span>
              <span className="text-sm font-bold text-zinc-400 mt-0.5">Guest</span>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}