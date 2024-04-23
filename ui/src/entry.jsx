import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";

(async () => {
  const main = document.getElementById("main");
  const root = ReactDOM.createRoot(main);
  root.render(
    <div>
      <h1>winning</h1>
      <App title={"yes"} />
    </div>
  );
})();
