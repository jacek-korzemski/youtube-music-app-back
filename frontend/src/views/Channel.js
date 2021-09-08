import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Error as ErrorComponent } from "components/Error/Error";
import Page from "components/AppWrapper/Page";
import ClipsList from "components/ClipsList/ClipsList";
import Loading from "components/Loading/Loading";
import { api_url } from "Config";

const Channel = () => {
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetch(api_url + "/getChannelById?" + new URLSearchParams({ id: id }), { method: "GET" })
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
    // eslint-disable-next-line
  }, []);

  return (
    <Page title={data ? data[0].channel_title : undefined}>
      {error ? <ErrorComponent code={404} /> : <>{data ? <ClipsList data={data} /> : <Loading />}</>}
    </Page>
  );
};

export default Channel;
