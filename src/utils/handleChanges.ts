import { ChangeEvent } from "react";

export const handleSelectChange = (value: string) => {
  let options: string[] = [];
  switch (value) {
    case "Chest":
      options = [
        "Bench Press",
        "Dumbbell Flyes",
        "Chest Press Machine",
        "Cable Crossover",
        "Push-Ups",
        "Chest Dips",
        "Incline Dumbbell Press",
        "Decline Bench Press",
        "Pec Deck Machine",
        "Cable Chest Press",
        "Smith Machine Bench Press",
      ];
      break;
    case "Arms":
      options = [
        "Bicep Curls",
        "Tricep Dips",
        "Hammer Curls",
        "Tricep Extensions",
        "Preacher Curls",
        "Skull Crushers",
        "Close-Grip Bench Press",
        "Cable Bicep Curls",
        "Overhead Tricep Press",
        "Zottman Curls",
        "Diamond Push-Ups",
        "Barbell Curl",
        "Tricep Rope Pushdown",
      ];
      break;
    case "Shoulders":
      options = [
        "Overhead Shoulder Press",
        "Lateral Raises",
        "Front Raises",
        "Rear Delt Flyes",
        "Shrugs",
        "Face Pulls",
        "Dumbbell Shoulder Press",
        "Barbell Shoulder Press",
        "Seated Dumbbell Lateral Raises",
        "Reverse Flyes",
        "Cable Lateral Raises",
        "Single-Arm Dumbbell Shoulder Press",
        "Machine Shoulder Press",
      ];
      break;
    case "Legs":
      options = [
        "Squats",
        "Deadlifts",
        "Lunges",
        "Leg Press",
        "Leg Extensions",
        "Leg Curls",
        "Calf Raises",
        "Glute Bridges",
        "Romanian Deadlifts",
        "Bulgarian Split Squats",
        "Seated Calf Raises",
        "Walking Lunges",
      ];
      break;
    case "Back":
      options = [
        "Pull-Ups",
        "Deadlifts",
        "Barbell Rows",
        "Lat Pulldowns",
        "T-Bar Rows",
        "Dumbbell Rows",
        "Seated Cable Rows",
        "Machine Rows",
        "Inverted Rows",
        "Face Pulls",
        "Back Extensions",
        "One-Arm Dumbbell Rows",
      ];
      break;
    case "Abs and Core":
      options = [
        "Planks",
        "Russian Twists",
        "Leg Raises",
        "Mountain Climbers",
        "Bicycle Crunches",
        "Hanging Leg Raises",
        "Reverse Crunches",
        "Flutter Kicks",
        "V-Ups",
        "Lying Leg Raises",
        "Turkish Get-Ups",
        "Pallof Press",
      ];
      break;
    default:
      options = [];
  }
  return options;
};

export const handleChange = (
  e: ChangeEvent<HTMLInputElement>,
  repSetNumber: { Rep: number; Set: number },
  setRepSetNumber: (
    value: React.SetStateAction<{ Rep: number; Set: number }>
  ) => void
) => {
  const { value, name } = e.target;
  setRepSetNumber((prev) => {
    return {
      ...prev,
      [name]: value,
    };
  });
};
