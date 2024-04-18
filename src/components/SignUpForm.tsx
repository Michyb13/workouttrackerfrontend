import axios from "axios";
import { useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const SignUpForm = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const submitForm = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formDetails.password !== formDetails.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5254/api/Account/Register",
        {
          username: formDetails.name,
          email: formDetails.email,
          password: formDetails.password,
        }
      );
      dispatch({ type: "Sign Up", payload: response.data });
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.response.data[0].description);
      setLoading(false);

      setLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-green-500 rounded shadow-lg">
      <h2 className="text-2xl text-white  mb-3 text-center">Sign Up</h2>
      <form onSubmit={submitForm}>
        <div className="mb-7">
          <label className="block text-white">Name</label>
          <input
            required
            minLength={7}
            type="text"
            className="block w-full mt-1 px-4 py-3 rounded bg-white text-black"
            placeholder="Name"
            name="name"
            value={formDetails.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-7">
          <label className="block text-white">E-mail</label>
          <input
            type="email"
            required
            className="block w-full mt-1 px-4 py-3 rounded bg-white text-black"
            placeholder="Email"
            name="email"
            value={formDetails.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-7">
          <label className="block text-white">Password</label>
          <input
            type="password"
            minLength={7}
            required
            className="block w-full mt-1 px-4 py-3 rounded bg-white text-black"
            placeholder="Password"
            name="password"
            value={formDetails.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-7">
          <label className="block text-white">Confirm Password</label>
          <input
            type="password"
            minLength={7}
            required
            className="block w-full mt-1 px-4 py-3 rounded bg-white text-black"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formDetails.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <button
          disabled={loading}
          className="block w-full bg-white text-green-500 py-2 rounded font-bold mb-8"
        >
          Sign Up
        </button>
      </form>
      <p className="text-white text-sm text-center">
        Already have an account?{" "}
        <Link to="/signin" className="text-green-200">
          Click here to sign in
        </Link>
      </p>
      {error && <div className=" text-center text-red-600 mt-5">{error}</div>}
    </div>
  );
};

export default SignUpForm;
