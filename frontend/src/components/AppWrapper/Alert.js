import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./AppWrapper";

const Alert = () => {
  const app = useContext(AppContext);

  const alertList = app.alerts;
  const [list, setList] = useState(alertList);

  useEffect(() => {
    setList(alertList);
  }, [alertList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (alertList.length && list.length) {
        deleteAlert(alertList[0].id);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };

    // eslint-disable-next-line
  }, [alertList, list]);

  const deleteAlert = (id) => {
    const listItemIndex = list.findIndex((e) => e.id === id);
    const alertListItem = alertList.findIndex((e) => e.id === id);
    list.splice(listItemIndex, 1);
    alertList.splice(alertListItem, 1);
    setList([...list]);
  };

  return (
    <>
      {list.map((elem, index) => (
        <div className={"alert"} key={index}>
          {elem.content}
        </div>
      ))}
    </>
  );
};

export default Alert;
