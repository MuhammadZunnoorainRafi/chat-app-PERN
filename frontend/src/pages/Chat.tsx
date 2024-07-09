import { FormEvent, useState } from 'react';
import { useGetConversations, useSendMessages } from '../actions/chat-actions';
import Conversations from '../components/Conversations';
import UsersChat from '../components/UsersChat';
import { toast } from 'react-toastify';
import { errorHandler, ErrorT } from '../lib/utils';

function Chat() {
  const { conversationData, isLoading } = useGetConversations();
  const [message, setMessage] = useState('');
  const { sendMessage, isPending } = useSendMessages();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await sendMessage(message);
      setMessage('');
    } catch (error) {
      toast.error(errorHandler(error as ErrorT));
    }
  };

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
      <div className="col-span-3 bg-slate-100 flex flex-col h-full justify-between">
        <div>
          <UsersChat />
        </div>
        <div className="flex-0">
          <form onSubmit={handleSubmit}>
            <label className="input input-bordered flex items-center gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                required
                className="grow"
                placeholder="Search"
              />
              <button type="submit" className="btn btn-sm btn-secondary">
                {isPending ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  'Send'
                )}
              </button>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
