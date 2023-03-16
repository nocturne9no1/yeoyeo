import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "@components/layout/Layout";
import { Main, Service, Reservation, Room, Admin } from "../pages";

const Router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/service",
        element: <Service />,
      },
      {
        path: "/room",
        element: <Room />,
      },
      {
        path: "/reservation",
        element: <Reservation />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);

export default Router;
