import { useState, useEffect } from "react";
import Page from "components/AppWrapper/Page";
import Loading from "components/Loading/Loading";
import ChannelsList from "components/ChannelsList/ChannelsList";
import { api_url } from "Config";

const Channels = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<any[]>([]);
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
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err);
      });
      // eslint-disable-next-line
  }, []);

  return (
    <Page title="Channels">
      {error ? <div style={{ color: "white" }}>Błąd...</div> : <>{loading ? <Loading /> : <ChannelsList data={data} />}</>}
    </Page>
  );
};

export default Channels;
