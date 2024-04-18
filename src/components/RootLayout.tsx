import { NavLink, Outlet } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const RootLayout = () => {
  const { state, dispatch } = useAuthContext();

  const renderUserInfo = () => {
    return (
      <>
        <h1 className="m-2 sm:mr-9 font-semibold text-lg sm:text-xl">
          Welcome back, {state.username}
        </h1>
        <button
          className=" bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={handleLogout}
        >
          Log out
        </button>
      </>
    );
  };

  const renderAuthLinks = () => {
    return (
      <>
        <h1 className="m-2 sm:mr-9 font-semibold text-lg sm:text-xl">
          <NavLink to="/register">Sign Up</NavLink>
        </h1>
        <h1 className="m-2 sm:mr-7 font-semibold text-lg sm:text-xl">
          <NavLink to="/signin">Sign In</NavLink>
        </h1>
      </>
    );
  };

  const handleLogout = () => {
    dispatch({ type: "Sign Out" });
    localStorage.clear();
  };

  return (
    <div>
      <nav className="flex flex-col sm:flex-row items-center justify-between border-b-2 border-green-400 rounded-b-lg sm:flex-wrap h-16">
        <h1 className="text-2xl sm:text-4xl font-bold m-2 sm:ml-7">
          <NavLink to="/">Workout Tracker</NavLink>
        </h1>
        <div className="flex flex-row items-center">
          {state.username ? renderUserInfo() : renderAuthLinks()}
        </div>
      </nav>
      <main className="max-w-7xl mx-auto my-0">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
