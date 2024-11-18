import { FC } from "react";
import styles from "src/components/Layout/styles.module.less";
import { Divider, Link, Stack } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div className={styles.layout}>
      <div className={styles["width-wrapper"]}>
        <header className={styles.header}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Link component={NavLink} variant="body1" to={"/"}>
              Домашняя
            </Link>
            <Link component={NavLink} variant="body1" to={"/katex"}>
              Katex
            </Link>
            <Link component={NavLink} variant="body1" to={"/mathjax"}>
              MathJax
            </Link>
          </Stack>
        </header>
      </div>
      <Divider flexItem />
      <div className={styles["width-wrapper"]}>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
