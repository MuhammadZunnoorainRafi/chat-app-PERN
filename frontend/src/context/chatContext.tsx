import { createContext, useState } from 'react';

export type ConversationType = {
  id: string;
  name: string;
  email: string;
};

export type MessageType = {
  id: string;
  body: string;
  senderId: string;
  createdAt: string;
  shouldShake?: boolean;
};

export interface ConversationState {
  selectedConversation: ConversationType | null;
  messages: MessageType[];
  setSelectedConversation: (conversation: ConversationType | null) => void;
  setMessages: (messages: MessageType[]) => void;
}

export const ChatContext = createContext<ConversationState | undefined>(
  undefined
);

export const ChatContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType | null>(null);

  return (
    <ChatContext.Provider
      value={{
        messages,
        selectedConversation,
        setMessages,
        setSelectedConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};