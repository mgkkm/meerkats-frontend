import React, { useState } from 'react';
import axios from 'axios';

export default function useAxios() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>('');

  const fetchData = async (url: any) => {
    try {
      setLoading(true);
      const response = await axios.request(url);
      const data = response?.data;
      setData(data);
      return data;
    } catch (error: any) {
      setError(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  return [loading, error, data, fetchData];
}
