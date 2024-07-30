import { useEffect, useState, useRef } from "react";
import useConversation from "../../../zustand/useConversation";
import MessageSkeleton from "../../../skeletons/MessageSkeleton"
import Message from "./Message";
import useListenMessages from "../../../hooks/useListenMessages";

import { useStateContext } from "../../../contexts/ContextsProvider";


const Messages = () => {
	// const { messages, setMessages, selectedConversation } = useConversation();
	// console.log(selectedConversation._id)
	const { messages, loading } = useGetMessages();
	useListenMessages()
	const lastMessageRef = useRef();	

	console.log(messages)

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;

const useGetMessages = () => {
	 const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();


	const { user } = useStateContext()
	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`api/message/reciver/${selectedConversation._id}/sender/${user._id}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};