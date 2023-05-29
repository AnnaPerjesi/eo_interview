import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home.tsx";
import DepartmentList from "./pages/department-list.tsx";
import Department from "./pages/department.tsx";
import { MantineProvider } from "@mantine/core";
import Layout from "./components/layout.tsx";
import EmployeeList from "./pages/employee-list.tsx";
import { Notifications } from "@mantine/notifications";

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/departments",
        Component: DepartmentList,
      },
      {
        path: "/employees",
        Component: EmployeeList,
      },
      {
        path: "/supervisors",
        element: <EmployeeList supervisor={true} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
    ,
  </React.StrictMode>
);
