import React, { useEffect } from "react";
import getAllTodos from "./api-calls/get-todo.api";

const App = ({ title }) => {
  useEffect(async () => {
    const res = await getAllTodos();
    console.log({ res });
  }, []);

  return <div>{title}</div>;
};

export default App;
