import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContextProvider";

const useWorkoutContext = () => {
  const workoutContext = useContext(WorkoutContext);
  if (!workoutContext)
    throw new Error(
      "useWorkoutContext must be used within a WorkoutContextProvider"
    );
  return workoutContext;
};

export default useWorkoutContext;
