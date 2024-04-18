import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const SignInForm = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const submitForm = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formDetails.email || !formDetails.password) {
      setError("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5254/api/Account/Login",
        formDetails
      );
      dispatch({ type: "Sign In", payload: response.data });
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-green-500 rounded shadow-lg">
      <h2 className="text-2xl text-white mb-3 text-center">Log in</h2>
      <form onSubmit={submitForm}>
        <div className="mb-8">
          <label className="block text-white">Email</label>
          <input
            type="email"
            aria-required
            className="block w-full mt-1 px-4 py-3 rounded bg-white text-black"
            placeholder="Email"
            name="email"
            value={formDetails.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-8">
          <label className="block text-white">Password</label>
          <input
            type="password"
            aria-required
            minLength={7}
            className="block w-full mt-1 px-4 py-3 rounded bg-white text-black"
            placeholder="Password"
            name="password"
            value={formDetails.password}
            onChange={handleChange}
          />
        </div>
        <button
          disabled={isLoading}
          className="block w-full bg-white text-green-500 py-2 rounded font-bold mb-8"
        >
          Login
        </button>
      </form>
      <p className="text-white text-sm text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-green-200">
          Click here to register
        </Link>
      </p>
      {error && <div className=" text-center mt-5 text-red-600">{error}</div>}
    </div>
  );
};

export default SignInForm;
