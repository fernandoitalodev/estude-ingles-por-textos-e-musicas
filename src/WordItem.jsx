import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"


const WordItem = ({word,key,selectedWords,setSelectedWords,setMessage}) => {

  const removeWord = (word)=>{
    let arr=selectedWords.filter((e)=> e !== word)
    
     setSelectedWords(arr)
     setMessage(["Palavra copiada!","text-green-500"])
    
    
  }
  useEffect(()=>{
    const timeout = setTimeout(() => {
      setMessage([""]);
    }, 5000);
  },[removeWord])
  return (
    <div key={key} className=" flex justify-between items-center   lg:p-2 rounded-xl border border-white text-center m-2 hover:border-blue-500 hover:text-blue-500 p-1 text-sm w-24">
<h2 > {word}  </h2>
<CopyToClipboard text={word}>
<FontAwesomeIcon icon={faXmark} onClick={()=> removeWord(word)}  />
</CopyToClipboard>

    </div>
  )
}

export default WordItem