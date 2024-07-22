import { useGetMessages } from '../actions/chat-actions';
import { useListenMessages } from '../hook/useListenMessages';
import { useChatContext } from '../lib/utils';
import Message from './Message';

function UsersChat() {
  const { selectedConversation } = useChatContext();
  const { messages, isLoading } = useGetMessages();
  useListenMessages();
  console.log(messages);
  if (!selectedConversation) {
    return <p>No Conversation is selected!</p>;
  }
  return (
    <div className="p-2">
      <h1 className="font-bold border-b pb-1">
        To: {selectedConversation?.name}
      </h1>
      <div>
        {isLoading ? (
          'Loading...'
        ) : messages ? (
          <div>
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
        ) : (
          <p>No Message yet</p>
        )}
      </div>
    </div>
  );
}

export default UsersChat;
