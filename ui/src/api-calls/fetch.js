import { v4 as uuid } from "uuid";

let correlationId = uuid();
let csrfToken;

const request = async (url, body, method) => {
  const res = await fetch(url, {
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      "csrf-token": csrfToken,
      "x-correlation-id": correlationId,
    },
    method,
  });

  correlationId = res.headers.get("x-correlation-id") || correlationId;
  csrfToken = res.headers.get("csrf-token") || csrfToken;

  if (res.ok) {
    const responseBody = await res.json();

    return responseBody;
  } else {
    const errorMessage = await res.text();
    console.warn(`Status: ${res.status}, Message: ${errorMessage}`);
    return { status: res.status, message: errorMessage };
  }
};

// all of our general api calls for CRUD
export const get = async (url) => request(url, undefined, "GET");
export const post = async (url, body) => request(url, body, "POST");
export const put = async (url, body) => request(url, body, "PUT");
export const callDel = async (url, body) => request(url, body, "DELETE");
