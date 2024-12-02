"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar({ children }) {
  const pathname = usePathname();

  const navigationItems = [
    { path: "/dashboard", label: "Home" },
    { path: "/dashboard/participant", label: "Participant" },
    { path: "/dashboard/program", label: "Programs" },
    { path: "/dashboard/payment_v2", label: "Payment" },
    { path: "/dashboard/calendar", label: "Calendar" },
    { path: "/dashboard/profile", label: "Profile" },
  ];

  return (
    <div className="drawer lg:drawer-open">
      {/* ----------------------------------------drawer button------------------------------------------ */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ml-4">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost mt-1 lg:hidden w-14 absolute -top-16"
        >
          <svg
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        {/* Content here */}
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-300 text-base-content min-h-full w-64 p-6">
          {/* Sidebar content here */}
          {navigationItems.map((item) => (
            <li key={item.path}>
              <Link
                className={`text-lg focus:text-neutral-content focus:bg-neutral ${
                  pathname === item.path ? "active" : ""
                }`}
                href={item.path}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* <li>
            <Link
              className="text-lg active:bg-neutral focus:text-neutral-content focus:bg-neutral "
              href="/dashboard"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-lg active:bg-neutral focus:bg-neutral focus:text-neutral-content"
              href="/dashboard/participant"
            >
              Participant
            </Link>
          </li>
          <li>
            <Link
              className="text-lg active:bg-neutral focus:bg-neutral focus:text-neutral-content"
              href="/dashboard/program"
            >
              Programs
            </Link>
          </li>
          <li>
            <Link
              className="text-lg active:bg-neutral focus:bg-neutral focus:text-neutral-content"
              href="/dashboard/payment_v2"
            >
              Payment
            </Link>
          </li>
          <li>
            <Link
              className="text-lg active:bg-neutral focus:bg-neutral focus:text-neutral-content"
              href="/dashboard/calender"
            >
              Calender
            </Link>
          </li>
          <li>
            <Link
              className="text-lg active:bg-neutral focus:bg-neutral focus:text-neutral-content"
              href="/dashboard/profile"
            >
              Profile
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
