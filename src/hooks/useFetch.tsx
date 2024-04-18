import { useState, useEffect } from "react";
import { Workout } from "../components/WorkoutLog";
import axios from "axios";

const useFetch = (url: string, token: string) => {
  const [data, setData] = useState<Workout[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [url, token]);

  return data;
};

export default useFetch;
