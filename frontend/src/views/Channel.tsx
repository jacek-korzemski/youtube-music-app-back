import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Error as ErrorComponent } from "components/Error/Error";
import Page from "components/AppWrapper/Page";
import ClipsList from "components/ClipsList/ClipsList";
import Loading from "components/Loading/Loading";
import { api_url } from "Config";

const Channel = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [chanelTitle, setChannelTitle] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState(false);

  const { id }: any = useParams();

  useEffect(() => {
    setLoading(true);
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
        setChannelTitle(res.items[0].channel_title);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err);
      });
    // eslint-disable-next-line
  }, [id]);

  return (
    <Page title={chanelTitle}>
      {error ? <ErrorComponent code={404} /> : <>{loading ?  <Loading /> : <ClipsList data={data} />}</>}
    </Page>
  );
};

export default Channel;
