import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ConversationType } from '../context/chatContext';

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
export const useGetConversations = () => {
  const getConversationsRequest = async (): Promise<ConversationType[]> => {
    const res = await axios.get(`${BASE_API_URL}/api/chat/conversation`, {
      withCredentials: true,
    });
    return res.data;
  };

  const {
    data: conversationData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['chat'],
    queryFn: getConversationsRequest,
  });

  return { conversationData, isLoading, error };
};
