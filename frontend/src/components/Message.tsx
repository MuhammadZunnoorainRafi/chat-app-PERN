import { MessageType } from '../context/chatContext';
import { useAuthContext } from '../lib/utils';

function Message({ message }: { message: MessageType }) {
  const { user } = useAuthContext();
  const fromMe = user.id === message.sender_id;
  const date = new Date(message.created_at).toLocaleDateString();
  return (
    <div>
      <h3
        className={`${
          fromMe ? 'bg-slate-800 text-left' : 'bg-blue-500 text-right'
        } text-white p-1`}
      >
        {message.message}
      </h3>
      <p className="text-xs">{date}</p>
    </div>
  );
}

export default Message;
