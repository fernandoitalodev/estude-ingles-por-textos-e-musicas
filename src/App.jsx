import { useEffect, useState } from "react";
import TextArea from "./TextArea";
import Filter from "./components/Filter";
import Menu from "./components/Menu";
import Dictionary from "./Dictionary";
import logo from "/Smart-study.png"
import Info from "./components/Info";

const tutorial=[
  {title:"Filtro: ",message:" escolha  entre músicas ou notícias para estudar por textos;"},
  {title:"Textos: ",message:"Ao clicar em uma palavra ela é adicionada a sua lista de palavras"},
  {title:"Dicionário: ",message:"Pesquise qual o significado das suas palavras;"}
]
function App() {
  const [selectedWords, setSelectedWords] = useState([]);
  //Se o filterMusic for verdadeiro o texto que será mostrado é o das músicas, se for falso irá mostrar as notícias
  const [filterMusic, setFilterMusic] = useState(true);
  const apiKey =import.meta.env.VITE_API_KEY_NEWS;
  const [api, setApi] = useState(
    "https://gnews.io/api/v4/search?q=car&lang=en&category=general&country=us&apikey="+apiKey
  );

  const [music, setMusic] = useState({ mus: [{ name: "....", text: "...." }] });
  const [apiMusic, setApiMusic] = useState(
    " https://api.vagalume.com.br/search.php?art=coldplay&mus=paradise&apikey={key}"
  );

  const [articles, setArticles] = useState([]);

  const getNews = async () => {
    let response = await fetch(api);
    let datas = await response.json();
    if(datas.articles == []){
        setArticles([
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
        ])
    }else{
       setArticles(datas.articles);
    }
   

    try {
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    getNews();
  }, [api]);

 

  const getMusic = async () => {
    try {
      let response = await fetch(apiMusic);
      let datasMusic = await response.json();
      if (
        (datasMusic.type == "notfound") |
        (datasMusic.type == "song_notfound")
      ) {
        setMusic({
          mus: [{ name: "Musica/Artista não encontrado!", text: "...." }],
        });
      } else {
        setMusic(datasMusic);
      }
    } catch (error) {
      console.log("Erro: " + error);
    }
  };

  useEffect(() => {
    getMusic();
  }, [apiMusic]);
  return (
    <>
      <div className=" bg-white text-black flex-container-col gap-2 bg-center bg-no-repeat  md:bg-[url('/bg-ingles.png')] bg-[url('/bg-mobile.png')] ">
        
        
        <img src={logo} alt="logo do site" className="w-72"/>
         
        <div className="text-[#1d2a57] mb-5">
          <h2>Como usar<Info infos={tutorial} /></h2>
        </div>
        <br/>
        <div className="grid  grid-cols-1 lg:grid-cols-3 justify-center lg:w-10/12 relative  ">
          

          <TextArea
            setSelectedWords={setSelectedWords}
            selectedWords={selectedWords}
            music={music}
            filterMusic={filterMusic}
            articles={articles}
          />
         <div className="order-1 lg:order-2 flex-container-col gap-2 justify-start lg:h-screen">
          <Filter
          setApi={setApi}
          filterMusic={filterMusic}
          setFilterMusic={setFilterMusic}
          setApiMusic={setApiMusic}
        />
          <Menu   selectedWords={selectedWords}
            setSelectedWords={setSelectedWords} />
         </div>
          
            
         
         
        </div>
        <Dictionary setSelectedWords={setSelectedWords}
            selectedWords={selectedWords} />
         
      </div>
    </>
  );
}

export default App;
