import React, { useState } from 'react'
import WordsArea from '../WordsArea'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faXmark } from '@fortawesome/free-solid-svg-icons'

const Menu = ({selectedWords,setSelectedWords}) => {
    const [hideMenu,setHideMenu]=useState(false)
  return (<>

    <div className={` w-7/12 lg:w-10/12   top-0 fixed h-screen bg-white lg:col-span-1 right-0 flex flex-col z-50 ${hideMenu? "block":"hidden"} lg:block lg:static `} >
<FontAwesomeIcon icon={faXmark} onClick={()=> setHideMenu(!hideMenu)} className="right-2 top-2 absolute text-2xl lg:hidden " />

<WordsArea
            selectedWords={selectedWords}
            setSelectedWords={setSelectedWords}
          />
    </div>

    <div  onClick={()=> setHideMenu(!hideMenu)}  className=" lg:hidden group fixed bottom-8 right-4 text-4xl flex hover:border hover:border-black items-center p-2 rounded-lg hover:bg-sky-600 gap-2 ">
        <span className=" text-xl hidden group-hover:block text-black ">Palavras</span>
       <FontAwesomeIcon icon={faBook} className='text-sky-600 animate-bounce group-hover:animate-none group-hover:text-white' />
    </div>
    </>
  )
}

export default Menu