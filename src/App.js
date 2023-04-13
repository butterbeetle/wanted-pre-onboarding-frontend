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
    path: "/signin",
    element: <SignInPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
