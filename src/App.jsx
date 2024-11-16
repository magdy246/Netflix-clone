import "./App.css";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Layout from "./components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRouterLog from "./components/ProtectedRouterLog/ProtectedRouterLog";
import ProtectedRouter from "./components/ProtectedRouter/ProtectedRouter";
import NewPassword from "./components/NewPassword/NewPassword";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ResetCode from "./components/RestCode/RestCode";
import Tranding from "./components/Tranding/Tranding";
import ChangesList from "./components/ChangesList/ChangesList";
import TvsLists from "./components/TvsLists/TvsLists";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";

function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "login", element: <ProtectedRouterLog><Login /></ProtectedRouterLog> },
        { path: "forgetpassword", element: <ProtectedRouterLog><ForgetPassword /></ProtectedRouterLog> },
        { path: "newpassword", element: <ProtectedRouterLog><NewPassword /></ProtectedRouterLog> },
        { path: "resetcode", element: <ProtectedRouterLog><ResetCode /></ProtectedRouterLog> },
        { path: "register", element: <ProtectedRouterLog><Register /></ProtectedRouterLog> },
        { path: "tranding", element: <ProtectedRouter><Tranding /></ProtectedRouter> },
        { path: "discover", element: <ProtectedRouter><ChangesList /></ProtectedRouter> },
        { path: "tv", element: <ProtectedRouter><TvsLists /></ProtectedRouter> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <ScrollToTopButton />
    </QueryClientProvider>
  );
}

export default App;
