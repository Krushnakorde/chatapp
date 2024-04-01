
import add from "../images/image_icon_153794.png"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"
import { useContext, useState } from "react";
import { Timestamp, serverTimestamp, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { storage, db } from "../firebase";
import { doc, arrayUnion } from "firebase/firestore";
import { toast } from "react-toastify";


// component for getting message
export const Input = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);


    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext)

    const handleSend = async () => {
        if (!data.chatId) {
            toast.error("Select the person.", {
                toastId: "input1"
            })
            setText("")
            return;
        }

        
        if (img ) {
            (console.log("i"))
            const storageRef = ref(storage, uuid());
            const uploadTask = uploadBytesResumable(storageRef, img)
                .then(() => {
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                senderId: currentUser.uid,
                                date: new Date().toLocaleTimeString(),
                                img: downloadURL,

                            })
                        })

                    }
                    )
                }
                )

        } else{

            console.log("t")

            await updateDoc(doc(db, "chats", data.chatId),
                {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: new Date().toLocaleTimeString()
                    })
                })

        } 


        await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: new Date().toLocaleTimeString()
        })

        await updateDoc(doc(db, 'userChats', data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text
            },
            [data.chatId + ".date"]: new Date().toLocaleTimeString()
        })

        setText("")
        setImg(null)

    }


    return (
        <>
            <div className="input">
                <input type='text' placeholder='Type something...' onChange={(e) => setText(e.target.value)} value={text} />
                <div className="send">
                    <i class="fa-solid fa-paperclip"></i>
                    <input type='file' style={{ display: "none" }} id='file' onChange={e => setImg(e.target.files[0])} />

                    <label htmlFor="file">
                        <img src={add} alt='' />
                    </label>

                    <button onClick={handleSend}>Send</button>
                </div>


            </div>
        </>
    )
}