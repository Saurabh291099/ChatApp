import { createContext, useState, useEffect } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";

// Create a new context for sharing chat-related data between components
export const ChatContext = createContext();

// Create a provider component that will manage and provide chat-related data to its children components

export const ChatContextProvider = ({ children, user }) => {

    // State to hold the user's chats
    const [userChats, setUserChats] = useState({
        text:'hello darling'
    });


    // State to track whether the chats are being loaded (useful for showing a loading spinner)
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);


    // State to hold any error that occurs while fetching the chats
    const [userChatsError, setUserChatsError] = useState(null);

    // useEffect is used to fetch the user's chats when the component mounts or when the "user" changes
    useEffect(() => {
        // Log the current user information to help with debugging
        console.log("User in ChatContextProvider:", user);

        // Function to fetch chats for the given user
        const getUserChats = async () => {

            // Check if the user has an ID (i.e., the user is logged in)
            if (user?._id) {

                console.log("Fetching chats for user:", user._id);

                // Indicate that we are starting to load the chats
                setIsUserChatsLoading(true);
                // Clear any previous errors
                setUserChatsError(null);


                // Make a GET request to fetch chats for this user from the server
                const response = await getRequest(`${baseUrl}/chats/${user?._id}`);



                // Loading is done, so set the loading state to false
                setIsUserChatsLoading(false);

                // If there's an error in the response, set the error state
                if (response.error) {
                    return setUserChatsError(response);
                }

                // If the response is successful, store the chats in state
                setUserChats(response);
            }
        };
        // Call the function to fetch the chats
        getUserChats();
    }, [user]) // This effect will re-run if the "user" changes


    // Return the provider component that wraps its children with chat-related data
    return <ChatContext.Provider
        value={{
            userChats,        // The fetched user chats
            userChatsError,   // Any error encountered while fetching chats
            isUserChatsLoading // Loading state for user chats
        }}>

        {/* Render the children components inside this provider */}
        {children}

    </ChatContext.Provider>

}
