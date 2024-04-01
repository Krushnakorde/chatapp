import { Messages } from "./Messages"
import { Input } from "./Input"
import { ChatContext } from "../context/ChatContext"
import { useContext } from "react"


// this chat component contain all right side .
export function Chat() {

    const { data } = useContext(ChatContext)

    return (
        <>
            <div className="chat">
                <div className="chatInfo">
                    <span>{data.user?.displayName}</span>
                    <div className="chatIcons">
                        <i class="fa-solid fa-video"></i>
                        <i class="fa-solid fa-user-plus"></i>
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                </div>

                {/* message component */}
                <Messages />

                {/* Input component */}
                <Input />
            </div>
        </>
    )

}