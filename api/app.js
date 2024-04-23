import express from "express";

const app = express();

app.get("/hello-world", (req, res) => {
  res.send("Hello World!");
});

export default app;
