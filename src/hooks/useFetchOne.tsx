import { useState, useEffect } from "react";
import axios from "axios";
import { Workout } from "../components/WorkoutLog";

const useFetchOne = (url: string, token: string) => {
  const [data, setData] = useState<Workout>(Object);

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

export default useFetchOne;
