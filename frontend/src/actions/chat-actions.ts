import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ConversationType, MessageType } from '../context/chatContext';
import { useChatContext } from '../lib/utils';

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

export const useGetMessages = () => {
  const { selectedConversation } = useChatContext();
  const getMessageRequest = async (): Promise<MessageType[]> => {
    const res = await axios.get(
      `${BASE_API_URL}/api/chat/${selectedConversation?.id}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  };
  const { data: allMessages, isLoading } = useQuery({
    queryKey: ['messages', selectedConversation?.id],
    queryFn: getMessageRequest,
  });
  return { allMessages, isLoading };
};

export const useSendMessages = () => {
  const { selectedConversation } = useChatContext();

  const queryClient = useQueryClient();
  const sendMessageRequest = async (message: string) => {
    await axios.post(
      `${BASE_API_URL}/api/chat/send/${selectedConversation?.id}`,
      { message },
      { withCredentials: true }
    );
  };

  const { mutateAsync: sendMessage, isPending } = useMutation({
    mutationFn: sendMessageRequest,
    onSuccess: async () =>
      await queryClient.invalidateQueries({
        queryKey: ['messages', selectedConversation?.id],
      }),
  });
  return { sendMessage, isPending };
};
