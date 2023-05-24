import React, {  useState } from "react";
let categories = [
  "general",
  "word",
  "nation",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
];
let languages = [
  ["en", "English"],
  ["fr", "French"],
  ["ja", "Japanese"],
  ["es", "Spanish"],
];



const Filter = ({ setApi, filterMusic, setFilterMusic,setApiMusic }) => {
  const apiKey =String(import.meta.env.VITE_API_KEY_NEWS);
  const [selectedCategory, setCategory] = useState("general");
  const [selectedLanguage, setLanguage] = useState("en");
  const [search, setSearch] = useState("");
  const [artist, setArtist] = useState("");
  const [songName, setSongName] = useState("");
  const handleSubmitFormNews = () => {
    setApi(
      `https://gnews.io/api/v4/search?q=${search}&lang=${selectedLanguage}&category=${selectedCategory}&country=us&apikey=${apiKey}`
    );
  };
  const handleSubmitFormMusic = () => {
    setApiMusic(
        ` https://api.vagalume.com.br/search.php?art=${artist}&mus=${songName}&apikey={key}`
    );
  };

  return (
    <div className=" bg-zinc-900  w-full h-auto relative border lg:w-7/12 lg:h-24 flex align-center justify-center rounded-lg ">
      <div className=" bg-blue-400 flex  gap-0 font-semibold   absolute rounded-lg justify-center -top-7   -translate-x-1/2 left-2/4  text-black">
        <button
          onClick={() => setFilterMusic(false)}
          className={` rounded-lg  p-3 ${
            !filterMusic ? "bg-white " : "bg-blue-400"
          }`}
        >
          News
        </button>
        <button
          onClick={() => setFilterMusic(true)}
          className={` rounded-lg p-3 ${
            filterMusic ? "bg-white " : "bg-blue-400"
          }`}
        >
          Music
        </button>
      </div>

      {filterMusic && (
        <div className="flex flex-col lg:flex-row md:flex-row items-center justify-center gap-3 p-7 ">

          <span>
                
                        <label htmlFor="artista"> Artista: </label>
                        <input
              id="artista"
              className="w-32 rounded-lg p-1 text-black"
              type="text"
              value={artist}
              onChange={(e)=>setArtist(e.target.value)}
                        />
          </span>
<span>
    
              <label htmlFor="musica"> Musica: </label>
              <input
                id="musica"
                className="w-32 rounded-lg p-1 text-black"
                type="text"
                value={songName}
                onChange={(e)=>setSongName(e.target.value)}
              />
</span>

          <button className="border p-1 rounded-lg"
          onClick={() => handleSubmitFormMusic()}>Buscar</button>
        </div>
      )}

      {!filterMusic && (
        <div className="flex flex-col items-center justify-center gap-2 lg:flex-row lg:pt-1 pt-7 p-3  ">
           <span>
                
                         <label htmlFor="categorias">Categoria: </label>
                         <select
               className=" select-style"
               name="categorias"
               id="categorias"
               onChange={(e) => setCategory(e.target.value)}
                         >
               {categories.map((el, index) => {
                 return (
                   <option key={index} value={el}>
                     {" "}
                     {el}
                   </option>
                 );
               })}
                         </select>
           </span>
<span>
    
              <label htmlFor="" className="">
                Linguagem:
              </label>
              <select
                onChange={(e) => setLanguage(e.target.value)}
                className=" select-style"
                name=""
                id=""
              >
                {languages.map((el, index) => {
                  return (
                    <option key={index} value={el[0]}>
                      {" "}
                      {el[1]}{" "}
                    </option>
                  );
                })}
              </select>
</span>
<span>
    
              <label htmlFor="">Pesquisar:</label>
              <input
                className="text-black p-1 w-28 rounded-lg"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                placeholder="..."
              />
</span>
          <button
            onClick={() => handleSubmitFormNews()}
            className="border p-1 rounded-lg"
          >
            Filtrar
          </button>
        </div>
      )}
    </div>
  );
};

export default Filter;
