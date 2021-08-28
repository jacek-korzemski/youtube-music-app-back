import React, { useState } from "react";
import Login from "./components/Login";
import TestApi from "./components/TestApi";

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  return <>{!token ? <Login setToken={setToken} setUserId={setUserId} /> : <TestApi token={token} userId={userId} />}</>;
};

export default App;
