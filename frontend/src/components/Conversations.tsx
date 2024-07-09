import { ConversationType } from '../context/chatContext';
import { useChatContext } from '../lib/utils';

type Props = {
  conversation: ConversationType;
};

function Conversations({ conversation }: Props) {
  const { setSelectedConversation, selectedConversation } = useChatContext();
  const isSelected = conversation.id === selectedConversation?.id;

  return (
    <div
      onClick={() => setSelectedConversation(conversation)}
      className={`${
        isSelected ? 'bg-blue-500' : 'hover:bg-slate-400 duration-150'
      } text-center py-2 cursor-pointer  `}
    >
      <h1 className="font-bold text-slate-800">{conversation.name}</h1>
      <p className="text-xs text-slate-500">{conversation.email}</p>
    </div>
  );
}

export default Conversations;
