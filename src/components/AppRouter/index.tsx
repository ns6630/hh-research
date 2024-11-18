import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "src/components/Layout";
import { ErrorBoundary } from "src/components/ErrorBoundary";
import { lazy, Suspense } from "react";
import { CircularProgress } from "@mui/material";

const Home = lazy(() => import("src/pages/Home"));
const Katex = lazy(() => import("src/pages/Katex"));
const MathJax = lazy(() => import("src/pages/MathJax"));

export default function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
        <Route
          index
          element={
            <Suspense fallback={<CircularProgress disableShrink />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="katex"
          element={
            <Suspense fallback={<CircularProgress disableShrink />}>
              <Katex />
            </Suspense>
          }
        />
        <Route
          path="mathjax"
          element={
            <Suspense fallback={<CircularProgress disableShrink />}>
              <MathJax />
            </Suspense>
          }
        />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}
