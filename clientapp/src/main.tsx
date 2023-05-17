import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Home from './pages/home.tsx'
import DepartmentList from './pages/department-list.tsx'
import Department from './pages/department.tsx'
import { MantineProvider } from '@mantine/core';
import Layout from './components/layout.tsx'


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
        path: "/department",
        Component: Department
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router} />
    </MantineProvider>,
  </React.StrictMode>
)
