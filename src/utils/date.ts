import { format } from "date-fns";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, "EEEE do MMMM, yyyy");
};

export default formatDate;

export const formattedDate = (dateString: string) => {
  try {
    // Attempt to parse the input date string
    const date = new Date(dateString);

    // Check if the parsed date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string");
    }

    // Format the valid date
    const formatted = format(date, "MM/dd/yyyy, hh:mm aa");
    return formatted;
  } catch (error) {
    console.error("Error formatting date:", error.message);
    return "Invalid Date";
  }
};
