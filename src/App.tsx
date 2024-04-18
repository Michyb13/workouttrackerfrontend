import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import RootLayout from "./components/RootLayout";
import DashBoard from "./pages/DashBoard";
import SignIn from "./pages/SignIn";
import Details from "./pages/Details";
import SignUp from "./pages/SignUp";
import LogWorkout from "./pages/LogWorkout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<DashBoard />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/logworkout" element={<LogWorkout />} />
        <Route path="/workout/:id" element={<Details />} />
      </Route>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
