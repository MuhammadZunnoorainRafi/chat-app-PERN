import { MessageType } from '../context/chatContext';
import { useAuthContext, useChatContext } from '../lib/utils';

function Message({ message }: { message: MessageType }) {
  const { user } = useAuthContext();
  const { selectedConversation } = useChatContext();
  const fromMe = user.id === message.senderid;
  const date = new Date(message.created_at).toLocaleString();
  return (
    <div className={`${fromMe ? 'text-left' : 'text-right'}`}>
      <h1 className="font-bold font-mono">
        {fromMe ? user.name : selectedConversation?.name}
      </h1>
      <h3
        className={`${
          fromMe
            ? 'bg-slate-800 rounded-tl-none '
            : 'bg-blue-500 rounded-tr-none'
        } text-white py-1 px-2  rounded-xl inline-block`}
      >
        {message.message}
      </h3>
      <p className="text-xs">{date}</p>
    </div>
  );
}

export default Message;
