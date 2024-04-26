import React, { useEffect } from "react";
import callHelloWorld from "./api-calls/hello-world.api";

const App = ({ title }) => {
  useEffect(async () => {
    const res = await callHelloWorld();
    console.log({ res });
  }, []);

  return <div>{title}</div>;
};

export default App;
