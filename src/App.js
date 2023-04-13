import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./Layout/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import SignupPage from "./pages/SignupPage";
import SignInPage from "./pages/SignInPage";
import TodoPage from "./pages/TodoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/signin",
        element: <SignInPage />,
      },
      {
        path: "/todo",
        element: <TodoPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
