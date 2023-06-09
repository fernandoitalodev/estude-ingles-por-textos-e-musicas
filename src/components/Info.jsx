import { faCircleInfo, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Tooltip from './Tooltip'


const Info = ({infos}) => {
  const [showInfo,setShow]=useState(false)
  return (
    <>  {
      !showInfo ?<Tooltip message="Info" > <FontAwesomeIcon onClick={()=>setShow(!showInfo)} icon={faCircleInfo} /> </Tooltip> : 
      
      <div className="2xl:text-3xl  bg-white fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2   w-10/12 h-3/4 rounded-lg p-3 shadow-md shadow-black border border-black lg:w-7/12 z-50 " >
        <FontAwesomeIcon icon={faXmark} onClick={()=>setShow(!showInfo) } className="right-2 top-2 absolute text-2xl: 2xl:text-6xl " />
        {
          infos.map((el,index)=>{
            return <p className='mt-4' key={index} > <span className="font-semibold text-xl 2xl:text-4xl mr-2" >{el.title}</span>{el.message}</p>
          })
        }
     
      </div>
    

    
    }
    </>
  
  )
}

export default Info