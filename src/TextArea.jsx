import React, { useEffect, useState } from "react";
import TextStructure from "./TextStructure";

let text = [
  {
    content:
      "There was a time I used to look into my fathers eyes In a happy home I was a king, I had a gold throne Those days are gone Now they re memories on the wall I hear the songs From the places where I was born",
    title: "song",
  },
  {
    content:
      "There was a time I used to look into my fathers eyes In a happy home I was a king, I had a gold throne Those days are gone Now they re memories on the wall I hear the songs From the places where I was born",
    title: "song",
  },
];
let textError=[]
const TextArea = ({ setSelectedWords, selectedWords, articles,filterMusic,music }) => {
  const selectWord = (el) => {
    if (selectedWords.includes(el)) {
      alert(el + " já está na lista de palavras");
      return;
    } else {
      setSelectedWords([...selectedWords, el]);
    }
  };
  const selectColor = (wordSpan) => {
    if (selectedWords.includes(wordSpan)) {
      return true;
    }
  };

  const formatText = (element) => {
    let txt = element;
    return txt.split(" ").map((el, index) => {
      return (
        <span
          className={`${selectColor(el) ? "text-green-500" : ""}`}
          key={`wordSelect${index}  `}
          onClick={() => selectWord(el)}
        >
         
          {el} {" "} {el.includes("\n") && <br/>}
        </span>
      );
    });
  };

  const musicIsEmpty =()=>{
   
       console.log("deu merda: ")
       console.log(music)
    
  }
  useEffect(()=>{musicIsEmpty()},[music])

  return (
    <div className="col-span-3 rounded-lg  min-h-96 max-h-full lg:order-1 bg-blue-700 shadow-md shadow-blue-600 font-semibold ">
      <h1 className="text-center text-2xl font-semibold p-2"> { filterMusic && "Musica 🎶 "} {!filterMusic && "Textos 📖 "} </h1>

      <div className={` p-3 ${filterMusic ? "text-center p-4 text-3xl ":"text-2xl"}`}>
       
        { filterMusic &&   <TextStructure title={formatText(music.mus[0].name ) } content={formatText(music.mus[0].text)} />
      
            
        }
        { !filterMusic && articles.slice(0, 3).map((el, index) => {
          return (
            <TextStructure
              title={formatText(el.title)}
              content={formatText(el.content)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TextArea;
