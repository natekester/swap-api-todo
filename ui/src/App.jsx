import React, { useEffect } from "react";
import getAllTodos from "./api-calls/get-todo.api";
import callHelloWorld from "./api-calls/hello-world.api";

const App = ({ title }) => {
  useEffect(() => {
    async function fetchData() {
      const helloWorldRes = await callHelloWorld();
      console.log({ helloWorldRes });
      const todosList = await getAllTodos();
      console.log({ todosList });
    }
    fetchData();
  }, []);

  return <div>{title}</div>;
};

export default App;
