"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { SiEventbrite } from "react-icons/si";
import {
  FiHome,
  FiCalendar,
  FiPlus,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiChevronDown,
} from "react-icons/fi";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // scroll effect
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // dark mode
  useEffect(() => {
    darkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // close menu on route change
  useEffect(() => setOpenMenu(false), [pathname]);

  const isActive = (path) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  const navItems = [
    { href: "/", label: "Home", icon: FiHome },
    { href: "/all-events", label: "All Events", icon: FiCalendar },
    { href: "/add-events", label: "Add Event", icon: FiPlus },
    { href: "/manage-event", label: "Manage Events", icon: FiSettings },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[999] transition-all ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 shadow-lg backdrop-blur-lg"
          : "bg-white/70 dark:bg-gray-900/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <Link href="/" className="flex items-center space-x-2">
            <SiEventbrite
              size={32}
              className="text-white bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-md shadow-md"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EventHub
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    active
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* RIGHT SECTION (DESKTOP) */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* dark mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {session ? (
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="flex items-center space-x-3 p-2 rounded-lg border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <img
                    src={session.user?.image || "/default-avatar.png"}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="text-left">
                    <p className="text-sm font-semibold">
                      {session.user?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {session.user?.email}
                    </p>
                  </div>
                  <FiChevronDown
                    className={`transition-transform ${
                      openDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 py-2">
                    <Link
                      href="/manage-event"
                      className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FiSettings className="mr-2" /> Manage Events
                    </Link>

                    <Link
                      href="/add-events"
                      className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FiPlus className="mr-2" /> Create Event
                    </Link>

                    <button
                      onClick={signOut}
                      className="flex w-full items-center px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                    >
                      <FiLogOut className="mr-2" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="hover:text-blue-600">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-lg shadow-md hover:scale-105 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {openMenu ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {openMenu && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998]"
            onClick={() => setOpenMenu(false)}
          />

          <div className="lg:hidden fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700 z-[999] rounded-b-xl shadow-xl mx-3">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                      active
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="border-t py-4 px-4">
              {session ? (
                <>
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <img
                      src={session.user?.image || "/default-avatar.png"}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{session.user?.name}</p>
                      <p className="text-xs text-gray-500">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={signOut}
                    className="flex w-full items-center px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                  >
                    <FiLogOut className="mr-2" /> Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-lg text-center"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
