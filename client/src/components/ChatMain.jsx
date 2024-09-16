import { React, useContext, useState } from 'react'
import Chat from './Chat'
import Sidebar from './Sidebar'
import data from '../Data'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext'
import Chats from './Chats'
import PotentialChat from './PotentialChat'

const ChatMain = () => {

    const { user } = useContext(AuthContext);

    const { userChats, userChatsError, isUserChatsLoading } = useContext(ChatContext);


    // if (isUserChatsLoading) return <div>Loading chats...</div>;
    // if (userChatsError) return <div>Error loading chats: {userChatsError.message}</div>;


    // console.log({ user })
    // console.log("Userchats:", userChats)


    const [chatData, setChatData] = useState(data);
    const [currentUserId, setCurrentUserId] = useState(null);


    const selectChat = (userId) => {
        setCurrentUserId(userId);
        resetUnreadCount(userId);
    };

    const markAsUnread = (userId) => {
        setChatData(prevData =>
            prevData.map(user =>
                user.userId === userId
                    ? { ...user, unreadCount: 1 }
                    : user
            )
        );
    };

    const resetUnreadCount = (userId) => {
        setChatData(prevData =>
            prevData.map(user =>
                user.userId === userId
                    ? { ...user, unreadCount: 0 }
                    : user
            )
        );
    };

    const deleteChat = (userId) => {
        setChatData(prevData => prevData.filter(user => user.userId !== userId));
    };

    const currentUser = data.find(user => user.userId === currentUserId);
    return (
        <>

            <div className="relative grid grid-cols-12 gap-4">
                {/* Guarding the map with userChats being an array */}


                {/* <div className={`absolute md:relative md:block col-span-12 md:col-span-4 lg:col-span-3 border border-black ${currentUser ? 'hidden' : 'block'
                    }`}>
                    <PotentialChat />


                    {userChats && userChats.length > 0 ? (
                        userChats.map((chat, index) => {
                            return (
                                <div
                                    key={index}
                                >
                                    <Chats chat={chat} user={user} />
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-12">
                            <h1 className="text-3xl font-semibold">No chats available</h1>
                        </div>
                    )}


                </div> */}
                {/* {userChats.map((chat, index) => {
                    return (
                        <>
                            <div key={index} className={`absolute md:relative md:block col-span-12 md:col-span-4 lg:col-span-3 ${currentUser ? 'hidden' : 'block'}`}>
                                <Chats chat={chat} user={user} />

                            </div>
                        </>

                    )
                })} */}
                <div className={`absolute md:relative md:block col-span-12 md:col-span-4 lg:col-span-3 ${currentUser ? 'hidden' : 'block'}`}>
                    <Sidebar users={chatData} selectChat={selectChat} markAsUnread={markAsUnread} deleteChat={deleteChat} resetUnreadCount={resetUnreadCount} currentUserId={currentUserId} />
                </div>
                <div className={`md:block col-span-12 md:col-span-8 md:relative lg:col-span-9 ${currentUser ? 'block' : 'hidden'}`}>
                    {currentUser ? (
                        <Chat user={currentUser} />
                    ) : (
                        <div className="flex justify-center items-center h-[100vh]">
                            <h1 className='text-3xl font-semibold'>Select a chat to view messages</h1>
                        </div>
                    )}
                </div>
            </div >
        </>
    )
}

export default ChatMain
