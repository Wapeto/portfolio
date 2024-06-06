import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ContactPage from "./pages/ContactPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "contact",
        element: <ContactPage />,
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        <Analytics />
        <SpeedInsights />
    </React.StrictMode>,
);
