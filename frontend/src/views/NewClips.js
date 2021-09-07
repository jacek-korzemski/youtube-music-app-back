import React, { useState, useEffect } from "react";
import Loading from "components/Loading/Loading";
import ClipsList from "components/ClipsList/ClipsList";
import Page from "components/AppWrapper/Page";
import { api_url } from "Config";

const NewClips = () => {
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(api_url + "/getNewVideos")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error while communication with API.");
        } else {
          return res.json();
        }
      })
      .then((res) => {
        setData(res.items);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, []);

  return (
    <Page title="New clips">
      {error ? <div style={{ color: "white" }}>Błąd...</div> : <>{data ? <ClipsList data={data} /> : <Loading />}</>}
    </Page>
  );
};

export default NewClips;
