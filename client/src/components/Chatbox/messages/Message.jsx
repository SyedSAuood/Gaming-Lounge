import useConversation from "../../../zustand/useConversation";
import { useStateContext } from "../../../contexts/ContextsProvider"

const Message = ({ message }) => {
	// const { authUser } = useAuthContext();
	const {user} = useStateContext()

	const senderid = "66204ecb633f1df45027e4c6"
	 const { selectedConversation } = useConversation();
	 console.log(message.senderId)
	 const fromMe = message.senderId === user._id;
	 console.log(user._id)
	
	 const chatClassName = fromMe ? "chat-end" : "chat-start";

	//  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	 
	const bubbleBgColor = fromMe ? "#7e22ce" : "";

	// const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={"https://avatar.iran.liara.run/public/boy"} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor}  pb-2`}>{message.message}</div>
			{/* <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div> */}
		</div>
	);
};
export default Message;
