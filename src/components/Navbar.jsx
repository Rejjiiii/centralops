import { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice"; // ✅ adjust path
import { persistor } from "../redux/app/store";   // ✅ to clear persisted storage
import { useNavigate, Link } from "react-router-dom"; // ✅ use Link

const navItems = [
  { name: "Profile", href: "/Dashboard" },
  { name: "Employee List", href: "/EmployeeList" },
  { name: "Projects", href: "/ProjectList" },
  { name: "Calendar", href: "/Calendar" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar = () => {
  const [currentPath, setCurrentPath] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPath(window.location.pathname); // detect current URL
  }, []);

  const handleLogout = () => {
    dispatch(logout());      // clear Redux auth state
    persistor.purge();       // clear redux-persist storage
    sessionStorage.clear();  // ✅ clear session storage (if used)
    localStorage.clear();    // ✅ clear local storage (if used)
    navigate("/");           // ✅ redirect to login
  };

  return (
    <Disclosure
      as="nav"
      className="relative bg-[#192338] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>

          {/* Logo + Desktop Menu */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Link to="/" className="text-2xl font-bold text-white">
                CENTRALOPS
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navItems.map((item) => {
                  const isActive = currentPath === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={classNames(
                        isActive
                          ? "bg-gray-950/50 text-white"
                          : "text-gray-300 hover:bg-white/5 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <MenuButton className="relative flex rounded-full">
                <span className="sr-only">Open user menu</span>
                <img
                  alt="User Avatar"
                  src="../src/assets/DP.png"
                  className="size-10 rounded-full object-cover bg-gray-800 outline -outline-offset-1 outline-white/10"
                />
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10">
                <MenuItem>
                  <Link
                    to="/Dashboard"
                    className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5"
                  >
                    Your profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/Settings"
                    className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5"
                  >
                    Settings
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                aria-current={isActive ? "page" : undefined}
                className={classNames(
                  isActive
                    ? "bg-gray-950/50 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            );
          })}
          {/* Mobile logout option */}
          <DisclosureButton
            as="button"
            onClick={handleLogout}
            className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
          >
            Sign out
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};
