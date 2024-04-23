import app from "./app.js";

const { API_HOST, API_PORT } = process.env;
console.log({ API_HOST, API_PORT, process, env: process.env });

const server = app.listen(API_PORT, API_HOST);

console.log(`Listening on http://${API_HOST}:${API_PORT}`);
