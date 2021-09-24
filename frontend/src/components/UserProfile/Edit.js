import React, { useState, useContext, useEffect } from "react";
import { EditWrapper } from "./Wrappers";
import { AppContext } from "components/AppWrapper/AppWrapper";
import Button from "components/Button/Button";
import { api_url } from "Config";
import Channels from "./Channels";
import Loading from "components/Loading/LoadingBlack";
import updateToken from "helpers/updateToken";

const Edit = () => {
  const app = useContext(AppContext);
  const [displayName, setDisplayName] = useState("");
  const [data, setData] = useState(false);

  useEffect(() => {
    updateToken(app).then((newToken) => {
      app.updateToken(newToken);
      const formData = new FormData();

      formData.append("userId", app.user.userId);
      formData.append("token", newToken.token);

      fetch(api_url + "/getUserData", { method: "POST", body: formData })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Sorry, something went wrong...");
          } else {
            return res.json();
          }
        })
        .then((res) => {
          setData(res.data);
          setDisplayName(res.data.display_name);
        })
        .then(() => {
          console.log(data);
        })
        .catch((err) => console.log(err));
    });

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
      {!data ? (
        <div style={{ height: "300px" }}>
          <Loading />
        </div>
      ) : (
        <>
          <form>
            <h2 style={{ textAlign: "center" }}>Your profile</h2>
            <hr />
            <p>Display name:</p>
            <input type="text" name="display_name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            <p className="section-title">Your subscribed channels:</p>
            <div className="channels">
              {data && data.subscribed_channels ? (
                <>
                  <Channels channels={data?.subscribed_channels} />
                </>
              ) : (
                <>No subscribed channels</>
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
        </>
      )}
    </EditWrapper>
  );
};

export default Edit;
