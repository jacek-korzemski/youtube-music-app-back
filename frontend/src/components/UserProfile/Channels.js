import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { api_url } from "Config";
import { AppContext } from "components/AppWrapper/AppWrapper";

const Channels = (props) => {
  const app = useContext(AppContext);
  const [data, setData] = useState(false);

  useEffect(() => {
    const formData = new FormData();

    formData.append("ids", props.channels);

    fetch(api_url + "/getMultipleChannelsById", { method: "POST", body: formData })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        } else {
          return res.json();
        }
      })
      .then((res) => setData(res.items))
      .catch((err) => console.log(err));

    // eslint-disable-next-line
  }, []);

  const unsubscribe = () => {
    // TODO fetch unsubscribe channel
  };

  return (
    <>
      {!data ? (
        "Loading..."
      ) : (
        <>
          {data.map((elem, index) => (
            <div className="channel" key={index}>
              <Link to={"/channel/" + elem.id} onClick={() => app.setModal(false)}>
                {elem.channel_title}
              </Link>
              <span className="cancel" title={"unsubscribe"} onClick={unsubscribe}>
                [x]
              </span>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Channels;
