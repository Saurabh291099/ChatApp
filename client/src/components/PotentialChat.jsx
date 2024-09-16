import React, { useContext, useState } from 'react'
import { ChatContext } from '../context/ChatContext'

const PotentialChat = () => {

    const { potentialChat } = useContext(ChatContext);

    // console.log("Potential Chat:", potentialChat);
    return (
        <div>
            Start Chat
        </div>
    )
}

export default PotentialChat
