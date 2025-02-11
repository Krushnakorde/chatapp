import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";


// this component is part of sidebar which shows all users which is chosen

function Chats() {

    const [chats, setChats] = useState();
    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)


    useEffect(() => {
        const getUser = () => {

            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            })
            return () => {
                unsub();
            }
        }

        currentUser.uid && getUser();

    }, [currentUser.uid])


    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u })
    }


    if (!chats) {
        return;
    }

    console.log(Object.entries(chats))

    return (
        <>
            <div className="chats">
                {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                    <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)} >
                        <img src={chat[1].userInfo.photoURL} />
                        <div className="userChatInfo">
                            <span>{chat[1].userInfo.displayName}</span>
                            <div>{chat[1].lastMessage?.text}</div>
                        </div>
                    </div>
                )



                )}

            </div>
        </>
    )


}

export default Chats;