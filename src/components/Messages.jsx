
import { doc, onSnapshot } from "firebase/firestore";
import { Message } from "./Message"
import { db } from "../firebase";
import { useState, useEffect, useContext } from "react";
import { ChatContext } from "../context/ChatContext";

// getting all messages data from the server and sending to message component(real time data)
export const Messages = () => {
    const [messagesData, setMessages] = useState([]);
    const { data } = useContext(ChatContext);




    useEffect(() => {

        if (data.chatId) {
            onSnapshot(doc(db, "chats", data.chatId), (doc) => {
                // snapshot.exists()&& setMessages(doc.data().messages)

                setMessages(doc.data())
                
            })
        }


    }, [data.chatId])



    const { messages } = messagesData;


    return (
        <div className="messages">

            {messages?.map(m => {
                return <Message message={m} key={m.id} />
            })}
            
        </div>
        
    )

}