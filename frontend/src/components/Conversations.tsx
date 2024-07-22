import { ConversationType } from '../context/chatContext';
import { useChatContext, useSocketContext } from '../lib/utils';

type Props = {
  conversation: ConversationType;
};

function Conversations({ conversation }: Props) {
  const { onlineUsers } = useSocketContext();
  const { setSelectedConversation, selectedConversation } = useChatContext();
  const isSelected = conversation.id === selectedConversation?.id;
  const isOnline = onlineUsers.includes(conversation.id);

  return (
    <div
      onClick={() => setSelectedConversation(conversation)}
      className={`${
        isSelected ? 'bg-blue-500' : 'hover:bg-slate-400 duration-150'
      } text-center py-2 cursor-pointer  `}
    >
      <p className="font-bold text-slate-800">{conversation.name}</p>
      <p className=" text-slate-800">{conversation.id}</p>
      <p
        className={`${
          isOnline ? 'bg-green-500' : 'bg-red-500'
        } h-2 w-2 rounded-full`}
      ></p>

      <p className="text-xs text-slate-500">{conversation.email}</p>
    </div>
  );
}

export default Conversations;
