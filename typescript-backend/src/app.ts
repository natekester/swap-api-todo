import express, { Application, Request, Response } from "express";
import todoRoute from "./routes/todo.route.js";

const app: Application = express();

app.use("/api/todos", todoRoute);

app.get("/api/hello-world", (req: Request, res: Response) => {
  console.log("/api", req.rawHeaders);
  res.json({ helloWorld: "Hello World!" });
});

export default app;
