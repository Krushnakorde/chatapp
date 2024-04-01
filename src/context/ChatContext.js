import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";


export const ChatContext = createContext();


export const ChatContextProvider = ({ children }) => {
    const INITIAL_STATE = {
        chatId: null,
        user: {}
    }
    let { currentUser } = useContext(AuthContext)

    if (!currentUser) {
        currentUser = "";
    }

    // created a chat Reducer it will executed for combinedId (chats collection requests)

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid
                        ? currentUser.uid + action.payload.uid
                        : action.payload.uid + currentUser.uid
                }


            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
    console.log(currentUser.uid)
    console.log(state.chatId)

    return (
        <>
            <ChatContext.Provider value={{ data: state, dispatch }}>
                {children}
            </ChatContext.Provider>
        </>
    )


}