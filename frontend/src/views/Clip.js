import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Page from "components/AppWrapper/Page";
import { api_url } from "Config";
import { Error as ErrorComponent } from "components/Error/Error";
import Player from "components/Player/Player";
import Loading from "components/Loading/Loading";

const Clip = (props) => {
  const [data, setData] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(api_url + "/getVideoById?" + new URLSearchParams({ id: id }), { method: "GET" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error while communicating with API.");
        } else {
          return res.json();
        }
      })
      .then((res) => {
        setData(res.items[0]);
      })
      .catch((err) => {
        console.log(err);
        setData(false);
        setError(true);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <Page title={data ? data.title : "..."}>
      {error && <ErrorComponent code={404} />}
      {data ? <Player data={data} /> : <Loading />}
    </Page>
  );
};

export default Clip;
