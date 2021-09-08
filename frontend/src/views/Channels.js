import React, { useState, useEffect } from "react";
import Page from "components/AppWrapper/Page";
import Loading from "components/Loading/Loading";
import ChannelsList from "components/ChannelsList/ChannelsList";
import { api_url } from "Config";

const Channels = () => {
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(api_url + "/getAllChannels")
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
    <Page title="Channels">
      {error ? <div style={{ color: "white" }}>Błąd...</div> : <>{data ? <ChannelsList data={data} /> : <Loading />}</>}
    </Page>
  );
};

export default Channels;
