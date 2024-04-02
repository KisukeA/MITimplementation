import { createBrowserRouter, RouterProvider, Outlet, Navigate, useParams } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.js";
import Login from "./pages/login/login.js";
import Register from "./pages/register/register.js";
import Profile from "./pages/profile/profile.js";
import UserProfile from "./pages/userprofile/userprofile.js";
import SingleEvent from "./pages/singleevent/singleevent.js";
import Home from "./pages/home/home.js";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { useContext, useState } from "react";
import './App.css';


function App() {

  /*function checkCookie(name) {
    function escape(s) { return s.replace(/([.*+?$(){}|\]\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
  }*/
  const { user } = useContext(AuthContext);
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client = {queryClient}>
        <div className="AppLayout">
          <Outlet />
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const ProtectedProfile = ({ children }) => {
    const { userId } = useParams();
    if (user?.id.toString() !== userId) {
      return <Navigate to="/" />;
    }
    return children;
  };
  const ProtectedUserProfile = ({ children }) => {
    const { userId } = useParams();
    if (user?.id.toString() === userId) {
      return <Navigate to={`/profile/${userId}`} />;
    }
    return children;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          index:true,
          element: <Home />,
        },
        {
          path: "/profile/:userId",
          element: (
            <ProtectedProfile>
              <Profile />
            </ProtectedProfile>
          ),
        },
        {
          path: "/userprofile/:userId",
          element: (
            <ProtectedUserProfile>
              <UserProfile />
            </ProtectedUserProfile>
          ),
        },
        {
          path: "/singleevent/:eventId",
          element: <SingleEvent />,
        }
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div style={{width: "100vw",height:"100svh", overflow:"hidden"}}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
