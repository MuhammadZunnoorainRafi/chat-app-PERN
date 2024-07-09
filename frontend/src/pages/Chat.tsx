import { useGetConversations } from '../actions/chat-actions';
import Conversations from '../components/Conversations';

function Chat() {
  const { conversationData, isLoading } = useGetConversations();

  return (
    <div className="grid grid-cols-4 max-w-5xl mx-auto p-3 bg-white rounded-md h-[70vh] overflow-y-scroll">
      <div className="col-span-1 bg-slate-300">
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <div>
            {conversationData
              ? conversationData.map((conversation) => (
                  <Conversations
                    key={conversation.id}
                    conversation={conversation}
                  />
                ))
              : 'no data'}
          </div>
        )}
      </div>
      <div className="col-span-3 bg-slate-100">grid-3</div>
    </div>
  );
}

export default Chat;
