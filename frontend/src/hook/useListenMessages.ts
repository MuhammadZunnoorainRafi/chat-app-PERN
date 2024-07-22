import { useEffect } from 'react';
import { useChatContext, useSocketContext } from '../lib/utils';

export const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useChatContext();
  useEffect(() => {
    socket?.on('newMessages', (newMessage) => {
      setMessages([...messages, newMessage]);
    });
    return () => {
      socket?.off('newMessage');
    };
  }, [messages, setMessages, socket]);
};
