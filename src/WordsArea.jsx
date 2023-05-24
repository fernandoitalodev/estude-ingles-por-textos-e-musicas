import React, { useState } from "react";
import WordItem from "./WordItem";

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
    <div className=" bg-zinc-900 rounded-xl shadow-md shadow-zinc-800  lg:overflow-auto  lg:h-full lg:w-full   lg:static  ">
      <h1 className="text-center text-2xl font-semibold p-2"> Palavras 🖊️ </h1>

      <div className="flex flex-col h-64 lg:h-auto items-center justify-start">
        <div className="text-black flex justify-between p-2 mb-6 relative">
          <input
            className="rounded-lg p-2 w-auto sm:w-36 mr-2"
            placeholder="Adicione uma palavra"
            type="text"
            name=""
            id=""
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="border border-white rounded-lg p-1 bg-white "
            onClick={handleAddWord}
          >
            ADD
          </button>
          <span className={`text-center text-sm ${message[1]? message[1]:"text-red-600 "} absolute -bottom-3`} >
            {message[0]}
           
          </span>
        </div>

<div  className="flex overflow-x-auto w-full flex-wrap  lg:overflow-hidden  items-center justify-center " >
  
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
