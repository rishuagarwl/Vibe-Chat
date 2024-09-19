import React from 'react'
import {useAuthContext} from "../../context/authContext"
import useConversation from '../../store/useConversation'
import { extractTime } from '../../utils/extractTime'

const Message = ({message}) => {
  const {authUser} = useAuthContext()
  const {selectedConversation} = useConversation()
  const fromMe = message.senderId === authUser._id
  const chatClassName = fromMe ? 'chat-end':'chat-start'
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic
  const bgColor = fromMe ? 'bg-blue-500' : ""
  const formattedTime = extractTime(message.createdAt)


  return (
    <div className= {`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
          <div className='w-10 rounded-full'>
            <img src={profilePic} alt='user avatar'/>

          </div>
        </div>
        <div className={`chat-bubble text-white ${bgColor}`}>{message.message}</div>
        <div className={`chat-footer opactiy-50 text-xs flex gap-1 items-center`}>{formattedTime}</div>
    </div>
  )
}

export default Message