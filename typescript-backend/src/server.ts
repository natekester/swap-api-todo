import app from "./app.js";

const { API_HOST, API_PORT } = process.env;

app.listen(Number(API_PORT), `${API_HOST}`);

console.log(`Listening on http://${API_HOST}:${API_PORT}`);