import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const useAuthVerify = () => {
  const authVerifyRequest = async () => {
    const res = await axios.get(`${BASE_API_URL}/api/user/validate-token`, {
      withCredentials: true,
    });
    return res.data;
  };

  const {
    data: authVerifiedData,
    isError,
    isLoading,
  } = useQuery({ queryKey: ['auth'], queryFn: authVerifyRequest });

  return {
    authVerifiedData,
    isError,
    isLoading,
  };
};
