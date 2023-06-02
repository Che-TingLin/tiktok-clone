import Axios from 'axios';
import { useCallback, useState } from 'react';

const axios = Axios.create({
  baseURL: '/api',
  timeout: 30000,
  withCredentials: true,
});

axios.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      'content-type': 'application/json; charset=UTF-8',
      Accept: 'application/json; charset=UTF-8',
    };
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

const useAxios = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async ({ url, method, data, params }) => {
    setIsLoading(true);
    try {
      const res = await axios({ url, method, data, params });
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    sendRequest,
  };
};

export default useAxios;
