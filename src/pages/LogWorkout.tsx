import { useNavigate } from "react-router-dom";
import LogWorkoutForm from "../components/LogWorkoutForm";
import { useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";

const LogWorkout = () => {
  const navigate = useNavigate();
  const { state } = useAuthContext();
  useEffect(() => {
    if (!state.token || !state.userId || !state.username) {
      navigate("/signin");
    }
  }, [state.token, state.userId, state.username, navigate]);
  return <LogWorkoutForm />;
};

export default LogWorkout;
