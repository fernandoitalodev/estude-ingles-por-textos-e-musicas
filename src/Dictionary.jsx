import {
  faCopy,
  faMagnifyingGlass,
  faPlay,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Tooltip from "./components/Tooltip";
import Info from "./components/Info";
const dictionaryInfo=[
  {title:"Palavras da lista:",message:"Mostra as palavras que estão na sua lista de palavras para estudo;"},
   {title:" -",message:"Ao clicar em uma palavra da lista ela é adicionada a barra de pesquisa de palavras;"},
   {title:" -",message:"Quando uma palavra é adicionada a barra de pesquisa ela é automaticamente removida da sua lista de palavras;"}
]
const Dictionary = ({ setSelectedWords, selectedWords }) => {
  const playSound = (el) => {
    const audio = new Audio(el);
    audio.play();
  };
  const [apiData, setApiData] = useState(null);
  const [word, setWord] = useState("see");
  const [inputWord, setInputWord] = useState("");
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const getData = async () => {
    const data = await fetch(
      "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
    );
    const response = await data.json();
    setApiData(response[0]);
  };
  useEffect(() => {
    getData();
  }, [word]);
  const searchWord = () => {
    if (inputWord == "") {
      return setMessage("Insira uma Palavra!");
    } else {
      setWord(inputWord);
    }
  };
  const nextWord = () => {
    if (count == selectedWords.length-1) {
      return 
    } else {
      setCount(count + 1);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 5000);
  }, [nextWord]);
  const inputRef = useRef(null);
  const handleClearInput = () => {
    setInputWord("");
    inputRef.current.focus();
  };
  const sendWord=()=>{
    if(selectedWords.lenght <1){
      return
    }else{

      setInputWord(selectedWords[count])
      setSelectedWords(selectedWords.filter((el)=> el !== selectedWords[count]))
    }
    
  }
  return (
    <div className="h-screen text-[#1d2a57] grid-span-3 relative mt-4 ">
      <div className="flex items-center justify-center gap-3 relative " >
        <h1 className="text-5xl xl:text-27xl text-center mb-4 font-bold">Dicionário</h1>
        <Info  infos={dictionaryInfo} />
      </div>
      <div className="flex gap-2 relative items-center justify-center ">
        <div
          onClick={() => sendWord()}
          className="w-6/12   text-lg relative m-2"
        >
          <h5 className="xl:text-xl text-sm absolute -top-5">Palavras da lista: <span>{selectedWords.length <1? count : count+1}/ {selectedWords.length}</span> </h5>
          <div className="flex items-center justify-center h-12 border-pink-500  text-center border-2 rounded-lg overflow-y-auto">
            {" "}
            {selectedWords[count]}{" "}
          </div>
        </div>
        <div
          onClick={() => nextWord()}
          className="border p-2 text-lg rounded-lg border-[#1d2a57] hover:bg-[#1d2a57] hover:text-white xl:text-xl "
        >
          Próxima
        </div>

      </div>
      <div className="flex gap-2 justify-center mt-3  relative">
        <div className="relative">
          <input
            ref={inputRef}
            value={inputWord}
            onChange={(e) => setInputWord(e.target.value)}
            className="border-2 border-[#1d2a57] p-2 rounded-lg xl:w-72"
            type="text"
          />
          <FontAwesomeIcon
            onClick={() => handleClearInput()}
            icon={faX}
            className="absolute right-3 top-4"
          />
        </div>
        <button
          onClick={() => searchWord()}
          className="font-semibold border-[#1d2a57] border-2 p-2 rounded-lg hover:bg-[#1d2a57] hover:text-white xl:text-xl "
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        <span className="-bottom-6 absolute text-red-500 ">{message}</span>
      </div>
      {apiData ? (
        <div className="font-serif w-auto">
          <div className=" m-3 flex items-center justify-between p-2  ">
            <div className="">
              <h2 className="text-7xl text-bold xl:text-10xl ">{apiData.word}</h2>
              <h3 className=" indent-3 text-xl xl:text-4xl text-pink-500 font-semibold">
                {apiData.phonetic}
              </h3>
            </div>
            <div
              onClick={() => playSound(apiData.phonetics[0].audio)}
              className="bg-pink-100 text-3xl w-16 h-16 border rounded-[50%] border-pink-400 flex items-center justify-center xl:text-5xl  "
            >
              <FontAwesomeIcon className="ml-1 text-pink-500  " icon={faPlay} />
            </div>
          </div>
          <div className="m-2 flex-col flex gap-2">
            {apiData.meanings.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`mt-2 border-t-2 border-indigo-700 ${
                    item.definitions.length <= 1 ? "hidden" : ""
                  }`}
                >
                  <h1 className="text-2xl font-semibold xl:text-4xl bg-white p-3 ">
                    {" "}
                    {item.partOfSpeech}
                  </h1>

                  <div className="flex-col flex gap-3">
                    {item.definitions.slice(0, 9).map((el, index) => {
                      return (
                        <div
                          className={`  ${
                            el.example && item.definitions.length > 3
                              ? "border-b border-orange-500 "
                              : " "
                          }  `}
                          key={index}
                        >
                          {el.example && item.definitions.length > 3 && (
                            <>
                              {" "}
                              <h3 className=" text-lg xl:text-2xl  font-semibold  text-md">
                                {" "}
                                {el.definition}
                              </h3>
                              <ol className="list-disc  p-2 ml-">
                                <li className="text-sm xl:text-2xl">
                                  {" "}
                                  {el?.example}
                                  <CopyToClipboard text={el.example}>
                                    <Tooltip message="Copiar">
                                      <FontAwesomeIcon
                                        className="text-md ml-1"
                                        icon={faCopy}
                                      />
                                    </Tooltip>
                                  </CopyToClipboard>
                                </li>
                              </ol>
                            </>
                          )}
                          {!el.example && item.definitions.length < 3 && (
                            <>
                              <h3 className=" text-lg  font-semibold  text-md">
                                {" "}
                                {el.definition}
                              </h3>
                              <ol className="list-disc  p-2 ml-">
                                <li className="text-sm "> {el?.example} </li>
                              </ol>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>Palavra não encontrada!</p>
      )}
    </div>
  );
};

export default Dictionary;
