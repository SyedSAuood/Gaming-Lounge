import { create } from "zustand";

const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
	//Nofication work
	notifications: [],
    setNotifications: (notifications) => set({ notifications }),
}));

export default useConversation;
