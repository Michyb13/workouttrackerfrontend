import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WorkoutLog from "../components/WorkoutLog";
import useWorkoutContext from "../hooks/useWorkoutContext";
import useFetch from "../hooks/useFetch";
import useAuthContext from "../hooks/useAuthContext";

const DashBoard = () => {
  const { state, dispatch } = useWorkoutContext();
  const { state: authstate } = useAuthContext();
  const navigate = useNavigate();
  const data = useFetch("http://localhost:5254/api/Workout", authstate.token);

  useEffect(() => {
    dispatch({ type: "Set Workouts", payload: data });
  }, [data, dispatch]);

  useEffect(() => {
    if (!authstate.token || !authstate.userId || !authstate.username) {
      navigate("/signin");
    }
  }, [authstate.token, authstate.userId, authstate.username, navigate]);

  return <WorkoutLog workouts={state.workouts} />;
};

export default DashBoard;
