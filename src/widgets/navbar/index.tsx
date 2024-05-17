"use client";

import styles from "./styles.module.scss";
import { IProps } from "./props";
import Link from "next/link";
import classNames from "classnames";
import { useAuth } from "processes";
import { Button } from "shared";
import { usePathname } from "next/navigation";

const navTopContent = [
  {
    id: 1,
    title: "Products table",
    path: "/",
    icon: (
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="text-xl"
        height="20px"
        width="20px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Actions history",
    path: "/history",
    icon: (
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        className="text-xl"
        height="20px"
        width="20px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"></path>
      </svg>
    ),
  },
];

export const Navbar = (props: IProps) => {
  const { logout } = useAuth();
  const pathname = usePathname();

  const isNavButtonActive = (path: string) => {
    return path === pathname;
  };

  return (
    <nav className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <Link href={"/"}>Arm Management</Link>
        </div>
        <div className={styles.main}>
          <div className={styles.mid}>
            <ul className={classNames(styles.ul, "space-y-1")}>
              {navTopContent.map((i) => (
                <li key={i.id} className={styles.li}>
                  <Link
                    href={i.path}
                    className={classNames(
                      styles.link,
                      isNavButtonActive(i.path) && styles.active,
                    )}
                  >
                    <div className={styles.link_content}>
                      {i.icon}
                      <p>{i.title}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/*<div className={styles.bottom}>*/}
          {/*  <ul className={classNames(styles.ul, "space-y-1")}>*/}
          {/*    <li className={styles.li}>*/}
          {/*      <Link*/}
          {/*        href={""}*/}
          {/*        className={classNames(styles.link, styles.active)}*/}
          {/*      >*/}
          {/*        <p>Profile</p>*/}
          {/*      </Link>*/}
          {/*    </li>*/}
          {/*    <li className={styles.li}>*/}
          {/*      <Link href={""} className={styles.link}>*/}
          {/*        <p>Settings</p>*/}
          {/*      </Link>*/}
          {/*    </li>*/}
          {/*    <li className={styles.li}>*/}
          {/*      <button className={styles.link} onClick={logout}>*/}
          {/*        <p>Logout</p>*/}
          {/*      </button>*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
        </div>
      </div>
    </nav>
  );
};
