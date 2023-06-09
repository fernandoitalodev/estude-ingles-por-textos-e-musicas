import React, { useState } from "react";
import WordItem from "./components/WordItem";

const WordsArea = ({ selectedWords, setSelectedWords }) => {
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  
  const handleAddWord = () => {
    if (inputValue == "") {
      setMessage(["insira uma palavra"]);
      return;
    }
    if (selectedWords.includes(inputValue)) {
      setMessage(["Essa palavra já está na lista!"])
     
    }
    
    setMessage("");
    
    setSelectedWords([...selectedWords, inputValue]);
    setInputValue("");
  };
  return (
    <div className="overflow-y-auto h-screen overflow-x-hidden p-2 border-2 border-black rounded-lg lg:h-full">
      <h1 className="text-center text-2xl: 2xl:text-4xl font-semibold p-2"> Palavras 🖊️ </h1>

      <div className="flex flex-col h-64 items-center justify-start">
        <div className="w-full text-black flex justify-between flex-col p-2 mb-6 relative gap-2">
           <span className={` -top-3 text-center text-sm ${message[1]? message[1]:"text-red-600 "} absolute `} >
            {message[0]}
           
          </span>
          <input
            className="rounded-lg p-2 w-auto  border border-black "
            placeholder="Adicione uma palavra"
            type="text"
            name=""
            id=""
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          
          <button
            className=" w-6/12  self-center border border-black rounded-lg p-1 bg-white 2xl:text-2xl: "
            onClick={handleAddWord}
          >
            ADD
          </button>
         
        </div>

<div  className="flex flex-col   justify-center w-11/12 " >
  
          {selectedWords.map((el, index) => {
            return (
              <WordItem
                word={el}
                key={index}
                setSelectedWords={setSelectedWords}
                selectedWords={selectedWords}
                setMessage={setMessage}
              />
            );
          })}
  
  
</div>
      </div>
    </div>
  );
};

export default WordsArea;
