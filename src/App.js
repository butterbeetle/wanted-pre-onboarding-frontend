import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";
import SignupPage from "./pages/SignupPage";
import SignInPage from "./pages/SigninPage";
import TodoPage from "./pages/TodoPage";

const router = createBrowserRouter([
  {
    path: "/todo",
    element: <TodoPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <SignInPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/signin",
        element: <SignInPage />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignupPage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} basename={process.env.PUBLIC_URL} />;
}

export default App;
