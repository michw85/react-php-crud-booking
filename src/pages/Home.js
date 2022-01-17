import React, { useEffect } from "react";
// import { useHttp } from "../hooks/http.hook";
import { Provider } from "../Context";
import { Actions } from "../Actions";
import Form from "../components/Form";
import RoomList from "../components/RoomList";

export const HomePage = () => {
  // const { request } = useHttp(); // get object from hook http

  // hook for update input's field -> library materialize
  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  // if press "More" -> make a link
  const data = Actions();
  
  return (
    <>
      <Provider value={data}>
          <div className="App">
            <h1>React JS + PHP CRUD Booking Application</h1>
            <div className="wrapper">
              <section className="left-side">
                <Form />
              </section>
              <section className="right-side">
                <RoomList />
              </section>
            </div>
          </div>
        </Provider>
    </>
  );
};
