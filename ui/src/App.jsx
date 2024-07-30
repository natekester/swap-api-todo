import React, { useEffect, useState } from "react";
import getAllTodos from "./api-calls/get-todo.api";
import callHelloWorld from "./api-calls/hello-world.api";

const App = ({ title }) => {
  const [todoList, setTodoList] = useState([]);
  const [helloWorldSuccess, setHelloWorldSuccess] = useState(undefined);
  useEffect(() => {
    async function fetchData() {
      try {
        const helloWorldRes = await callHelloWorld();
        console.log({ helloWorldRes });
        if (helloWorldRes.status === 200 || helloWorldRes === "Hello World!") {
          setHelloWorldSuccess(true);
        } else {
          setHelloWorldSuccess(false);
        }
      } catch (e) {
        console.log(e);
        setHelloWorldSuccess(false);
      }

      const res = await getAllTodos();
      console.log({ res });
      setTodoList(res.todos);
    }
    fetchData();
  }, []);

  return (
    <div>
      <p>Did HelloWorld api return? {String(helloWorldSuccess)}</p>
      <h1>Current list of TODOS:</h1>
      <ul>
        {todoList?.length > 0
          ? todoList.map((item) => <li>{item.task}</li>)
          : "Loading"}
      </ul>
    </div>
  );
};

export default App;
