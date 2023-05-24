import { useEffect, useState } from "react";
import TextArea from "./TextArea";
import WordsArea from "./WordsArea";
import Filter from "./components/Filter";

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

  useEffect(() => {
    console.log("articles: " + articles);
  }, [articles]);

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
      <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center gap-4   ">
        <h1 className="text-4xl text-center p-3 mb-3 font-bold ">
          Study English APP
        </h1>

        <Filter
          setApi={setApi}
          filterMusic={filterMusic}
          setFilterMusic={setFilterMusic}
          setApiMusic={setApiMusic}
        />
        <div className="grid lg:grid-cols-4 auto-rows-max h-full   grid-cols-1 lg:w-9/12 lg:gap-2 ">
          <WordsArea
            selectedWords={selectedWords}
            setSelectedWords={setSelectedWords}
          />

          <TextArea
            setSelectedWords={setSelectedWords}
            selectedWords={selectedWords}
            music={music}
            filterMusic={filterMusic}
            articles={articles}
          />
        </div>
      </div>
    </>
  );
}

export default App;
