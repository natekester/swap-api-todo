import { BaseRepo } from "../repos/base.repo.js";
import { dbTables } from "../repos/dbtables.js";
import knx from "../repos/knex.js";

//enabling us to easily extend off of base class later
export const createTodoListRepo = (trx: typeof knx = knx) => {
  return new BaseRepo(dbTables.todoList, trx);
};
