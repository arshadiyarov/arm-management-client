import styles from "./styles.module.scss";
import { IProps } from "./props";
import Link from "next/link";
import classNames from "classnames";
import { useAuth } from "processes";
import { Button, navBottomContent, navTopContent } from "shared";
import { usePathname, useRouter } from "next/navigation";

export const Navbar = ({
  isNavExpanded,
  toggleNav,
  isCreateModalActive,
  toggleCreateModal,
}: IProps) => {
  const { logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isNavButtonActive = (path: string) => {
    return path === pathname;
  };

  const handleRouting = (path: string) => {
    router.push(path);
  };

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <>
      <nav className={styles.desktopContainer}>
        <div
          className={classNames(
            styles.content,
            isNavExpanded && styles.expanded,
          )}
        >
          <div className={styles.top}>
            <Button
              uppercase={false}
              mode={"icon"}
              size={"md"}
              onClick={toggleNav}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="24px"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="48"
                  d="M88 152h336M88 256h336M88 360h336"
                ></path>
              </svg>
            </Button>
            {isNavExpanded && (
              <Link href={"/"} className={styles.logo}>
                Arm Management
              </Link>
            )}
          </div>
          <div className={styles.main}>
            <div className={styles.mid}>
              <ul className={classNames(styles.ul, "space-y-1")}>
                {navTopContent.map((i) => (
                  <li key={i.id} className={styles.li}>
                    <Button
                      className={styles.btn}
                      uppercase={false}
                      size={"md"}
                      mode={
                        isNavExpanded
                          ? isNavButtonActive(i.path)
                            ? "primary"
                            : "ghost"
                          : isNavButtonActive(i.path)
                            ? "icon-primary"
                            : "icon"
                      }
                      onClick={() => handleRouting(i.path)}
                    >
                      {i.icon}
                      {isNavExpanded && <p>{i.title}</p>}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.bottom}>
              <ul className={classNames(styles.ul, "space-y-1")}>
                {navBottomContent.map((i) => (
                  <li key={i.id} className={styles.li}>
                    <Button
                      className={styles.btn}
                      size={"md"}
                      uppercase={false}
                      mode={
                        isNavExpanded
                          ? isNavButtonActive(i.path)
                            ? "primary"
                            : "ghost"
                          : isNavButtonActive(i.path)
                            ? "icon-primary"
                            : "icon"
                      }
                      onClick={() => handleRouting(i.path)}
                    >
                      {i.icon}
                      {isNavExpanded && <p>{i.title}</p>}
                    </Button>
                  </li>
                ))}
                <li className={styles.li}>
                  <Button
                    className={classNames(styles.btn, styles.logout)}
                    size={"md"}
                    uppercase={false}
                    mode={isNavExpanded ? "link" : "icon"}
                    onClick={handleLogoutClick}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="24px"
                      width="24px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                        d="M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40m64 160 80-80-80-80m-192 80h256"
                      ></path>
                    </svg>
                    {isNavExpanded && <p>Logout</p>}
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <nav className={styles.mobileContainer}>
        <div className={styles.content}>
          <ul className={styles.ul}>
            {navTopContent.map((i) => (
              <li key={i.id} className={styles.li}>
                <Button
                  mode={isNavButtonActive(i.path) ? "icon-primary" : "icon"}
                  className={styles.btn}
                  onClick={() => handleRouting(i.path)}
                >
                  {i.icon}
                </Button>
              </li>
            ))}
            <li className={styles.li}>
              <Button
                mode="icon"
                className={classNames(styles.btn, styles.create)}
                onClick={toggleCreateModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40px"
                  height="40px"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="none"
                    strokeMiterlimit="10"
                    strokeWidth="32"
                    d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                  ></path>
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M256 176v160m80-80H176"
                  ></path>
                </svg>
              </Button>
            </li>
            {navBottomContent.map((i) => (
              <li key={i.id} className={styles.li}>
                <Button
                  mode={isNavButtonActive(i.path) ? "icon-primary" : "icon"}
                  className={styles.btn}
                  onClick={() => handleRouting(i.path)}
                >
                  {i.icon}
                </Button>
              </li>
            ))}
            <li className={styles.li}>
              <Button
                mode={"icon"}
                className={classNames(styles.btn, styles.logout)}
                onClick={handleLogoutClick}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="24px"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="32"
                    d="M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40m64 160 80-80-80-80m-192 80h256"
                  ></path>
                </svg>
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
