import { HELLO_WORLD_API } from "./URLs.js";
import { get } from "./fetch.js";

export const callHelloWorld = async () => {
  const res = await get(HELLO_WORLD_API);
  return res;
};
export default callHelloWorld;
