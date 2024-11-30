import React from 'react'
import Bar from '../UI/Bar'
import BackgroundVideo from '../BackgroundVideo'

function SlidingBars() {
  return (
    <div  className=' SlidingBars overflow-hidden md:h-[50vh] h-[25vh]  mb-8     relative '>
        <Bar deg={'  lg:rotate-6 rotate-12 '}  derection={50}  />
        <Bar deg={' lg:-rotate-6 -rotate-12 '} derection={-50}  />
       
      
    </div>
  )
}

export default SlidingBars