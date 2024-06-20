import { BaseRepo } from "../repos/base.repo";
import { dbTables } from "../repos/dbtables";
import knx from "../repos/knex";

//enabling us to easily extend off of base class later
export const createTodoListRepo = (trx = knx) => {
  return new BaseRepo(dbTables.todoList, trx);
};
