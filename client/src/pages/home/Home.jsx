import React from 'react'
import SideBar from '../components/sidebar/SideBar'
import MessageContainer from '../components/messages/MessageContainer'

const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-[#3B1E54] bg-clip-padding backdrop-filter backdrop-blur-lg  '>
        <SideBar/>
        <MessageContainer/>
    </div>
  )
}

export default Home