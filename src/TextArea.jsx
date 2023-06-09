import React, { useEffect, useState } from "react";
import TextStructure from "./components/TextStructure";



const TextArea = ({ setSelectedWords, selectedWords, articles,filterMusic,music }) => {
  let text = [
    {
      content:
        "Não foram encontrados artigos",
      title: "...",
    },
    {
      content:
        "....",
      title: ".......",
    },
  ];
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

  const articlesIsEmpty=()=>{
    if(!articles || articles.lenght === 0 ){
      return text ;
    }
    
    return articles
  }
  const [updateArticles,setUpdateArticles]=useState([])
  useEffect(()=>{
  setUpdateArticles( articlesIsEmpty())},[articles])

  return (
    <div className="order-2 rounded-lg lg:border lg:border-black  mr-1 lg:col-span-2 overflow-y-auto flex-shrink lg:h-screen ">
      <h1 className="text-center text-2xl: xl:text-4xl font-semibold p-2"> { filterMusic && "Musica 🎶 "} {!filterMusic && "Textos 📖 "} </h1>

      <div className={` p-3 ${filterMusic ? "text-center p-4 text-xl ":"text-xl"} 2xl:text-2xl:`}>
       
        { filterMusic &&   <TextStructure title={formatText(music.mus[0].name ) } content={formatText(music.mus[0].text)} />
      
            
        }
        { !filterMusic && updateArticles.slice(0, 3).map((el, index) => {
          return (
            <TextStructure
              key={index}
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
