import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);

  async function fetchData() {
    const res = await axios.get(endpoint);
    setData(res.data);
  }

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [endpoint]);

  return data;
};

export default useFetch;
