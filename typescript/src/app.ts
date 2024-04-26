import express from "express";

const app = express();

app.get("/api/hello-world", (req, res) => {
  console.log("/api/hello-world", req.rawHeaders)
  res.set('Access-Control-Allow-Origin', 'http://localhost:433'); 
  res.send("Hello World!");
});

app.get("/hello-world", (req, res) => {
  console.log(1111111)
  console.log("/hello-world", req.rawHeaders)
  res.send("Hello World!");
});
app.get("/api", (req, res) => {
  console.log("/api", req.rawHeaders)
  res.send("Hello World!");
});




export default app;
