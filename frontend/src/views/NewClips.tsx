import { useState, useEffect } from "react";
import Loading from "components/Loading/Loading";
import ClipsList from "components/ClipsList/ClipsList";
import Page from "components/AppWrapper/Page";
import { api_url } from "Config";

const NewClips = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>({});
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
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <Page title="New clips">
      {error ? <div style={{ color: "white" }}>Błąd...</div> : <>{loading ? <Loading /> : <ClipsList data={data || undefined} />}</>}
    </Page>
  );
};

export default NewClips;
