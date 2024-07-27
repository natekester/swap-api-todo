console.log("test");
import express, { Application, Request, Response } from "express";
console.log("test");
import todoRoute from "./routes/todo.route";

const app: Application = express();

app.use("/api/todos", todoRoute);

app.get("/api", (req: Request, res: Response) => {
  console.log("/api", req.rawHeaders);
  res.send("Hello World!");
});

export default app;
