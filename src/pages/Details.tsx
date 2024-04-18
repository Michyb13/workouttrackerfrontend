import { Link, useParams, useNavigate } from "react-router-dom";
import useWorkoutContext from "../hooks/useWorkoutContext";
import useFetchOne from "../hooks/useFetchOne";
import { Workout } from "../components/WorkoutLog";
import { formattedDate } from "../utils/date";
import { CgArrowLeft } from "react-icons/cg";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";
import { useEffect } from "react";

const Details = () => {
  const { id } = useParams();
  const { dispatch } = useWorkoutContext();
  const { state } = useAuthContext();
  const navigate = useNavigate();
  const data = useFetchOne(
    `http://localhost:5254/api/Workout/${id}`,
    state.token
  );
  const workout: Workout = data;

  useEffect(() => {
    if (!state.token || !state.userId || !state.username) {
      navigate("/signin");
    }
  }, [state.token, state.userId, state.username, navigate]);

  const deleteWorkout = async (id: number | string) => {
    try {
      const response = await axios.delete(
        `http://localhost:5254/api/Workout/${id}`,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      dispatch({ type: "Delete Workout", payload: response.data });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const dateTime = formattedDate(workout.dateTime);
  return (
    <div className="p-4">
      <div className=" mb-5">
        <Link to="/">
          <h1 className=" text-3xl">
            <CgArrowLeft />
          </h1>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4 ml-10">Workout Details</h1>
      {workout ? (
        <div className="ml-10">
          <p className="mb-2">
            <strong className="text-lg">Date:</strong> {dateTime}
          </p>
          <p className="mb-2">
            <strong className="text-lg">Muscle Group Targeted:</strong>{" "}
            {workout.muscleGroup}
          </p>
          <p className="mb-2">
            <strong className="text-lg">Exercise Performed:</strong>{" "}
            {workout.exercise}
          </p>
          <p className="mb-2">
            <strong className="text-lg">Number Of Sets:</strong>{" "}
            {workout.setNumber}
          </p>
          <p className="mb-2">
            <strong className="text-lg">Number Of Reps:</strong>{" "}
            {workout.repNumber}
          </p>
          <button
            className=" bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
            onClick={() => deleteWorkout(id)}
          >
            Delete
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Details;
