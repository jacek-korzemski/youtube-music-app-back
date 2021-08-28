import React, { useState } from "react";
import { api_url } from "../../Config";

const TestApi = (props) => {
  const [counter, setCounter] = useState(0);
  const [channelId, setChannelId] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [pages, setPages] = useState([]);
  const [startPage, setStartPage] = useState("");

  const submitHandler = (e, nextPage) => {
    if (e) {
      e.preventDefault();
    }
    setIsDisabled(true);
    let url = "";

    if (nextPage) {
      url = api_url + "/youtube/update_channel/?id=" + channelId + "&page=" + nextPage;
    } else {
      if (startPage !== "") {
        url = api_url + "/youtube/update_channel/?id=" + channelId + "&page=" + startPage;
      } else {
        url = api_url + "/youtube/update_channel/?id=" + channelId;
      }
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          console.log(res);
        } else {
          return res;
        }
      })
      .then((res) => {
        setCounter(counter + 1);
        return res.json();
      })
      .then((res) => {
        if (res?.["next-page"]) {
          let tempPages = [...pages, res["next-page"]];
          setPages(tempPages);
          setTimeout(() => {
            submitHandler(undefined, res["next-page"]);
          }, 20000);
        } else {
          setIsDisabled(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <h1>zrobiono zrzutów: {counter}</h1>
      <form onSubmit={(e) => submitHandler(e)}>
        <input
          type="text"
          value={channelId}
          onChange={(e) => {
            setChannelId(e.target.value);
          }}
          disabled={isDisabled}
        />
        <input type="text" value={startPage} onChange={(e) => setStartPage(e.target.value)} disabled={isDisabled} />
        <input type="submit" value="Aktualizuj kanał" disabled={isDisabled} />
        <br />
      </form>
      <br />
      {isDisabled && "praca w toku..."}
      {pages.length > 0 && (
        <ul>
          {pages.map((elem, index) => (
            <li key={index}>{elem}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default TestApi;
