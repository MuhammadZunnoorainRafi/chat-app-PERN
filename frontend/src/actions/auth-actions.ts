import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { UserLogType, UserRegType } from '../lib/schema';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  const registerUserRequest = async (formData: UserRegType) => {
    await axios.post(`${BASE_API_URL}/api/user/register`, formData, {
      withCredentials: true,
    });
  };

  const { mutateAsync: registerUser, isPending } = useMutation({
    mutationFn: registerUserRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  return {
    registerUser,
    isPending,
  };
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const loginUserRequest = async (formData: UserLogType) => {
    await axios.post(`${BASE_API_URL}/api/user/login`, formData, {
      withCredentials: true,
    });
  };

  const { mutateAsync: loginUser, isPending } = useMutation({
    mutationFn: loginUserRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  return {
    loginUser,
    isPending,
  };
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const logoutRequest = async () => {
    const res = await axios.post(`${BASE_API_URL}/api/user/logout`, '', {
      withCredentials: true,
    });
    return res.data;
  };

  const { mutateAsync: logoutUser } = useMutation({
    mutationFn: logoutRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  return {
    logoutUser,
  };
};

export const useAuthVerify = () => {
  const authVerifyRequest = async () => {
    const res = await axios.get(`${BASE_API_URL}/api/user/validate-token`, {
      withCredentials: true,
    });
    return res.data.user;
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
