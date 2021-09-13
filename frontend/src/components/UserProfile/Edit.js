import React, { useState, useContext, useEffect } from "react";
import { EditWrapper } from "./Wrappers";
import { AppContext } from "components/AppWrapper/AppWrapper";
import Button from "components/Button/Button";
import { api_url } from "Config";

const Edit = () => {
  const app = useContext(AppContext);
  const [displayName, setDisplayName] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    const formData = new FormData();

    formData.append("userId", app.user.userId);
    formData.append("token", app.user.tokenHash);

    fetch(api_url + "/getUserData", { method: "POST", body: formData })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Sorry, something went wrong...");
        } else {
          return res.json();
        }
      })
      .then((res) => {
        setData(res);
        setDisplayName(res.data.display_name);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <EditWrapper>
      <span
        className="close-icon"
        onClick={() => {
          app.setModal(false);
        }}
      >
        [X]
      </span>
      <form>
        <h2 style={{ textAlign: "center" }}>Your profile</h2>
        <hr />
        <p>Display name:</p>
        <input type="text" name="display_name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        <p className="section-title">Your subscribed channels:</p>
        <div className="channels">
          {data && data.channels ? (
            <>
              {data.channels.map((elem, index) => (
                <div className="channel" key={index}>
                  {elem}
                </div>
              ))}
            </>
          ) : (
            <p className="blank">No subscribed channels</p>
          )}
        </div>
        <p className="section-title">Your Playlists:</p>
        <div className="playlists">
          {data && data.playlists ? (
            <>
              {data.playlists.map((elem, index) => (
                <div className="playlist" key={index}>
                  {elem}
                </div>
              ))}
            </>
          ) : (
            <p className="blank">No playlists</p>
          )}
        </div>
        <p className="section-title">Your reviews:</p>
        <div className="reviews">
          {data && data.reviews ? (
            <>
              {data.reviews.map((elem, index) => (
                <div className="review" key={index}>
                  {elem}
                </div>
              ))}
            </>
          ) : (
            <p className="blank">No reviews</p>
          )}
        </div>
        <p className="section-title">Your votes:</p>
        <div className="votes">
          {data && data.votes ? (
            <>
              {data.votes.map((elem, index) => (
                <div className="vote" key={index}>
                  {elem}
                </div>
              ))}
            </>
          ) : (
            <p className="blank">No votes</p>
          )}
        </div>
      </form>
      <p className="buttons-wrapper">
        <Button type="button" onClick={() => {}}>
          Update
        </Button>
        <Button type="button" onClick={() => app.setModal(false)}>
          Close
        </Button>
      </p>
    </EditWrapper>
  );
};

export default Edit;
