import { ChangeEvent, useState } from "react";
import { CgArrowLeft } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { handleSelectChange, handleChange } from "../utils/handleChanges";
import axios from "axios";
import useWorkoutContext from "../hooks/useWorkoutContext";
import useAuthContext from "../hooks/useAuthContext";

const LogWorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const { state } = useAuthContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [repSetNumber, setRepSetNumber] = useState({
    Rep: 0,
    Set: 0,
  });
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [muscleGroup, setMuscleGroup] = useState("");
  const [exercise, setExercise] = useState("");
  const formDetails = {
    muscleGroup: muscleGroup,
    exercise: exercise,
    setNumber: repSetNumber.Set,
    repNumber: repSetNumber.Rep,
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5254/api/Workout",
        { ...formDetails, UserId: state.userId },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      dispatch({ type: "Log Workout", payload: response.data });
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error);
      setIsLoading(false);
    }
  };

  return (
    <div className=" mt-6">
      <h1 className="text-3xl cursor-pointer" title="Go Back">
        <Link to="/">
          <CgArrowLeft />
        </Link>
      </h1>
      <form
        className="p-4 bg-green-400 text-black mt-5"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-2xl sm:text-lg">Muscle Group</label>
          <select
            className="w-full p-2 rounded border-black border text-lg sm:text-base"
            defaultValue=""
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              const options = handleSelectChange(e.target.value);
              setMuscleGroup(e.target.value);
              setSelectedOptions(options);
            }}
          >
            <option disabled selected value="">
              Choose a Muscle Group
            </option>
            <option value="Abs and Core">Abs and Core</option>
            <option value="Arms">Arms</option>
            <option value="Back">Back</option>
            <option value="Chest">Chest</option>
            <option value="Shoulders">Shoulders</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-2xl sm:text-lg">Exercise Done</label>
          <select
            className="w-full p-2 rounded border-black border text-lg sm:text-base"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setExercise(e.target.value);
            }}
          >
            <option disabled selected value="">
              Choose the exercise performed
            </option>
            {selectedOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-2xl sm:text-lg">Set Number</label>
          <input
            className="w-full p-2 rounded border-black border text-lg sm:text-base"
            type="number"
            name="Set"
            value={repSetNumber.Set}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e, repSetNumber, setRepSetNumber)
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-2xl sm:text-lg">Rep Number</label>
          <input
            className="w-full p-2 rounded border-black border text-lg sm:text-base"
            type="number"
            name="Rep"
            value={repSetNumber.Rep}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e, repSetNumber, setRepSetNumber)
            }
          />
        </div>
        <button
          disabled={isLoading}
          className="w-full mt-4 mb-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded sm:text-lg"
        >
          Log Workout
        </button>
        {error && <div className=" text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default LogWorkoutForm;
