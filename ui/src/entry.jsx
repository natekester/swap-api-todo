import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";

(async () => {
  const main = document.getElementById("main");
  const root = ReactDOM.createRoot(main);
  root.render(
    <div>
      <App title={"yes"} />
    </div>
  );
})();
