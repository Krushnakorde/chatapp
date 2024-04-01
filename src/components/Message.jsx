import { useContext, useRef, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/ChatContext"


// It will render message

export const Message = ({ message }) => {

    const { currentUser } = useContext(AuthContext)
    const { data } = useContext(ChatContext)

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])

    console.log(message)
    

    return (
        <>
            <div className={`message ${message.senderId === currentUser.uid && 'owner'} `} ref={ref}>

                <div className="messageInfo">


                    <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt='' />
                    <span>{message.date}</span>

                </div>
                <div className="messageContent">
                    {message.text?<p> { message.text } </p>: null}
                    {message && <img src={message.img} alt='' />}

                </div>
            </div>
        </>
    )

}

