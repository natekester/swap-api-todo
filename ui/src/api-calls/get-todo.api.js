import { GET_ALL_TODOS } from "./URLs.js";
import { get } from "./fetch.js";

export const getAllTodos = async () => {
  const res = await get(GET_ALL_TODOS);
  return res;
};
export default getAllTodos;
