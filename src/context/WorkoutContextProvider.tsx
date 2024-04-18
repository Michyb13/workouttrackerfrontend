import { createContext, useReducer, ReactNode, Dispatch } from "react";
import { Workout } from "../components/WorkoutLog";

type WorkoutContextProps = {
  children: ReactNode;
};

type WorkoutState = {
  workouts: Workout[];
};

type WorkoutAction =
  | { type: "Set Workouts"; payload: Workout[] }
  | { type: "Log Workout"; payload: Workout }
  | { type: "Delete Workout"; payload: Workout };

type ContextProviderProps = {
  state: WorkoutState;
  dispatch: Dispatch<WorkoutAction>;
};

export const WorkoutContext = createContext<ContextProviderProps | null>(null);
const reducer = (state: WorkoutState, action: WorkoutAction) => {
  switch (action.type) {
    case "Set Workouts":
      return {
        ...state,
        workouts: action.payload,
      };

    case "Log Workout":
      return {
        ...state,
        workouts: [...state.workouts, action.payload],
      };

    case "Delete Workout":
      return {
        ...state,
        workouts: state.workouts.filter(
          (workout) => workout.id !== action.payload.id
        ),
      };
  }
};

const WorkoutContextProvider = ({ children }: WorkoutContextProps) => {
  const initialState: WorkoutState = {
    workouts: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <WorkoutContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContextProvider;
