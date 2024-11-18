import { useEffect, useState } from "react";
import { Navigate, useRouteError } from "react-router-dom";
import styles from "src/components/ErrorBoundary/styles.module.less";
import { Typography } from "@mui/material";

const redirectTime = 5;

export function ErrorBoundary() {
  const error = useRouteError();
  let message = "";
  if (error instanceof Error) {
    message = error.message;
  } else {
    message = error?.toString?.() ?? "";
  }

  const [seconds, setSeconds] = useState(redirectTime);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => clearInterval(timer);
  }, []);

  if (seconds === 0) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.errorBoundary}>
      <div className={styles.errorBoundary__content}>
        <Typography variant="h1" gutterBottom>
          Ошибка
        </Typography>
        <Typography variant="body1" gutterBottom>
          {message}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Вы будете перенаправлены на главную страницу через {seconds} c.
        </Typography>
      </div>
    </div>
  );
}
