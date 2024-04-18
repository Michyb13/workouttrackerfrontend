import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useWorkoutContext from "../hooks/useWorkoutContext";
import formatDate from "../utils/date";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";

export type Workout = {
  id: number;
  dateTime: string;
  muscleGroup: string;
  exercise: string;
  setNumber: number;
  repNumber: number;
};

type WorkoutLogProps = {
  workouts: Workout[];
};

const WorkoutLog = ({ workouts }: WorkoutLogProps) => {
  const { dispatch } = useWorkoutContext();
  const { state } = useAuthContext();
  const [groupedWorkouts, setGroupedWorkouts] = useState<{
    [key: string]: Workout[];
  }>({});

  useEffect(() => {
    const grouped: { [key: string]: Workout[] } = {};
    workouts.forEach((workout) => {
      if (!grouped[workout.dateTime]) {
        grouped[workout.dateTime] = [workout];
      } else {
        grouped[workout.dateTime].push(workout);
      }
    });
    setGroupedWorkouts(grouped);
  }, [workouts]);

  const deleteWorkout = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:5254/api/Workout/${id}`,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      dispatch({ type: "Delete Workout", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 md:px-8 lg:px-16 xl:px-24">
      <h1 className="text-2xl font-bold mb-4">Logged Workouts</h1>
      <div className=" flex w-full items-end justify-end">
        <Link to="/logworkout">
          <button className=" flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            <FaPlus className=" text-md mr-2" />
            Log Workout
          </button>
        </Link>
      </div>
      {Object.keys(groupedWorkouts).length === 0 ? (
        <p>No workouts logged yet.</p>
      ) : (
        <>
          {Object.keys(groupedWorkouts).map((date) => (
            <div key={date} className="mb-4">
              <h2 className="text-lg font-semibold mb-2">{formatDate(date)}</h2>
              <ul className="divide-y divide-gray-300">
                {groupedWorkouts[date].map((workout, workoutIndex) => (
                  <li key={workoutIndex} className="py-4">
                    <Link to={`/workout/${workout.id}`}>
                      <div>
                        <p>
                          <strong className=" text-lg">Muscle Group:</strong>{" "}
                          {workout.muscleGroup}
                        </p>
                        <p>
                          <strong className=" text-lg">Exercise:</strong>{" "}
                          {workout.exercise}
                        </p>
                      </div>
                    </Link>
                    <button
                      className=" bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
                      onClick={() => deleteWorkout(workout.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default WorkoutLog;
