import axios from "axios";
import { useState,useEffect } from "react";
import Conversation from "./Conversation";
import {getRandomEmoji} from "../../../utils/emojis"
import { useStateContext } from "../../../contexts/ContextsProvider";

const Conversations = () => {
	const [conversations, setConversations] = useState([]);

	const { user } = useStateContext()

	useEffect(()=>{
		axios.get(`api/user/${user._id}`).then(res=>setConversations(res.data))
		
	  },[])
	  console.log(conversations)
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}
		</div>
	);
};
export default Conversations;
