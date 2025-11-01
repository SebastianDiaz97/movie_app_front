import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import { MediaDetails } from "./components/details/MediaDetails.tsx";
import InfiniteListWrapper from "./components/InfiniteListWrapper.tsx";
import "./index.css";
import Layout from "./Layout.tsx";
import { Login } from "./components/auth/Login.tsx";
import { CreateAccount } from "./components/auth/CreateAccount.tsx";
import { MyList } from "./components/MyList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: ":type/:id", element: <MediaDetails /> },
      { path: ":typeMedia/list/:typeList", element: <InfiniteListWrapper /> },
      { path: "login", element: <Login /> },
      { path: "create-account", element: <CreateAccount /> },
      { path: "my-list", element: <MyList /> },
      // { path: "serie/:id", element: <MediaDetails /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
