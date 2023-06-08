import React, { useState } from 'react'

const Tooltip = ({message,children}) => {
    const [showTooltip,setShowTooltip]=useState(false)
  return (
    <div className='inline-block relative' onMouseEnter={()=>setShowTooltip(!showTooltip)} onMouseLeave={()=>setShowTooltip(false)} >
          {
            showTooltip && <div className="absolute -top-8 -right-14 p-2 text-white font-semibold rounded-2xl rounded-bl-none bg-[#1d2a57] ">{message}</div>
          }
          {children}
    </div>
  )
}

export default Tooltip