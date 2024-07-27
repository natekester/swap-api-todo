import app from "./app.js";

const { API_HOST, API_PORT } = process.env;
console.log({ API_HOST, API_PORT });
const host = API_HOST || "0.0.0.0";
const port = Number(API_PORT) || 8000;

console.log("about to listen");
console.log("about to listen");
console.log("hmm");
app.listen(port, host);

console.log(`Listening on http://${host}:${port}`);
