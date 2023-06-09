import React, { useState } from "react";
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

const Filter = ({ setApi, filterMusic, setFilterMusic, setApiMusic }) => {
  const apiKey = String(import.meta.env.VITE_API_KEY_NEWS);
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
    <div className=" border-black w-full h-auto relative border-2 flex-container-row rounded-lg lg:w-full">
      <div className="  flex  gap-0 font-semibold   absolute rounded-lg justify-center -top-7 border border-black  -translate-x-1/2 left-2/4  text-black">
        <button
          onClick={() => setFilterMusic(false)}
          className={` rounded-lg  p-3 ${
            !filterMusic ? "bg-blue-400  " : "bg-white"
          }`}
        >
          News
        </button>
        <button
          onClick={() => setFilterMusic(true)}
          className={` rounded-lg p-3   ${
            filterMusic ? "bg-blue-400 " : "bg-white"
          }`}
        >
          Music
        </button>
      </div>

      {filterMusic && (
        <div className="flex  items-center justify-between p-7 ">
          <div className="w-7/12 p-3 flex-container-col gap-2">
            <span>
              <label htmlFor="artista" className="relative text-sm">
                {" "}
                Artista:{" "}
              </label>
              <input
                id="artista"
                className=" w-10/12 rounded-lg p-1 border border-black text-black"
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
              />
            </span>
            <div className="relative">
              <label htmlFor="musica" className="relative text-sm">
                {" "}
                Musica:{" "}
              </label>
              <input
                id="musica"
                className="w-10/12 rounded-lg p-1 text-black border border-black"
                type="text"
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
              />
            </div>

            <button
              className=" p-1 rounded-lg border border-black w-10/12 "
              onClick={() => handleSubmitFormMusic()}
            >
              Buscar
            </button>
          </div>

          <div className="">
            <img src="/music.svg" className="h-24" alt="" />
          </div>
        </div>
      )}

      {!filterMusic && (
        <div className="flex  pt-5 p-2 justify-between ">
          <div className="flex-container-col gap-2  p-3  ">
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
                className="text-black p-1 w-28 rounded-lg border border-black ml-2 "
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                type="text"
                placeholder="..."
              />
            </span>
            <button
              onClick={() => handleSubmitFormNews()}
              className="border p-2 rounded-lg border-black"
            >
              Filtrar
            </button>
          </div>
          <div className="flex-container-row">
            <img src="/news.svg" alt="" className=" w-24" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
