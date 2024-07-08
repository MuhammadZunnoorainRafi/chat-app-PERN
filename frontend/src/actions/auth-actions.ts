import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserLogType } from '../lib/schema';
import { errorHandler, ErrorT } from '../lib/utils';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const loginUserRequest = async (formData: UserLogType) => {
    const res = await axios.post(`${BASE_API_URL}/api/user/login`, formData, {
      withCredentials: true,
    });
    return res.data;
  };

  const { mutateAsync, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: loginUserRequest,
  });

  if (isError) {
    toast.error(errorHandler(error));
  }

  if (isSuccess) {
    queryClient.invalidateQueries({ queryKey: ['auth'] });
    toast.success('User logged In');
  }

  return {
    loginUser: mutateAsync,
    isPending,
  };
};

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
