import axios from "axios";
import React, { useEffect, useState } from "react";
import { PiSpeakerHighBold } from "react-icons/pi";

const Home = () => {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
      .then((res) => {
        setData(res.data);
        setSearch(false);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [search]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
  };

  const onEnter = (e) => {
    if (e.keyCode === 13 && e.key === "Enter") {
      setSearch(true);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full gap-5">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold">Dictionary</h1>
        <div className="flex flex-col">
          <input
            className="bg-gray-100 rounded-md h-9 pb-1 pl-3 mb-2"
            type="text"
            placeholder="Search Here"
            onChange={handleChange}
            onKeyDown={(e) => {
              onEnter(e);
            }}
          />
          <button
            onClick={() => setSearch(true)}
            className="bg-blue-500 text-white rounded-md px-3 py-1.5 w-fit"
          >
            Search
          </button>
          <i className="text-gray-500 text-sm">
            Such as: sun,nature, programme
          </i>
        </div>
      </div>
      <div className={`${data ? "" : "hidden"}`}>
        <ul className="flex flex-col gap-3">
          {data?.map((words, index) => (
            <li
              className="flex flex-col p-2 bg-slate-50 text-slate-700 text-xs"
              key={index}
            >
              <span className=" flex items-center gap-2 text-base capitalize">
                {words.word} -{" "}
                <span className="text-sm font-semibold">
                  {words.phonetic ?? words.phonetics[2].text} -{" "}
                  {words.meanings[0].partOfSpeech}{" "}
                </span>
                <PiSpeakerHighBold />
                <audio src={words.phonetics[2].audio}></audio>
              </span>
              
              {words.meanings[0].definitions[0].definition}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">Recents</h3>
        <ul className="list-disc">
          <li>Bear</li>
          <li>Transportation</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
