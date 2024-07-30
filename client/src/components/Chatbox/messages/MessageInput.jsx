import { useState } from "react";
import useConversation from "../../../zustand/useConversation";
import { useStateContext } from "../../../contexts/ContextsProvider";


// import { BsSend } from "react-icons/bs";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	
	const { loading, sendMessage } = useSendMessage();
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};
	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{/* {loading ? <div className='loading loading-spinner'></div> : <BsSend />} */}
					chat
				</button>
			</div>
		</form>
	);
};
export default MessageInput;

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const { user } = useStateContext()

	const sendMessage = async (message) => {
		setLoading(true);
		try {
			const res = await fetch(`api/message/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message , myid:user._id}),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};