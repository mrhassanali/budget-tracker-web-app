import React from "react";
import "./styles/App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoutes from "./Routes/ProtectedRoutes";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./Layout/Dashboard";
import Income from "./components/Form/Income";
import Expenses from "./components/Form/Expenses";
import Savings from "./components/Form/Savings";

function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Login />,
  //  },
  //   {
  //     path: "/signup",
  //     element: <Signup />,
  //   },
  //   {
  //     path: "/dashboard",
  //     element: (<ProtectedRoutes>
  //       <Dashboard/>
  //       </ProtectedRoutes>),
  //     // element: isAuthenticated?<Dashboard/>:<Navigate to="/" replace={true}/>,
  //     children: [
  //       {
  //         path: "income",
  //         element: <Income />,
  //       },
  //       {
  //         path: "expenses",
  //         element: <Expenses />,
  //       },
  //       {
  //         path: "savings",
  //         element: <Savings />,
  //       },
  //     ],
  //   },
  // ]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Login />} path="/" />
        <Route element={<Signup />} path="/signup" />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        >
          <Route element={<Income />} path="income" />
          <Route element={<Expenses />} path="expenses" />
          <Route element={<Savings />} path="savings" />
        </Route>
      </>
    )
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <RouterProvider router={router}>
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick rtl={false}
        pauseOnFocusLoss draggable pauseOnHover theme="light"
      </RouterProvider>
    </>
  );
}

export default App;
