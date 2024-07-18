import { Knex } from "../../node_modules/knex/types/index";
import { BaseRepo } from "../repos/base.repo";
import { dbTables } from "../repos/dbtables";

//enabling us to easily extend off of base class later

export class RepositoryFactory {
  knx: Knex;
  constructor(trx: Knex) {
    this.knx = trx;
  }

  createTodoListRepo = (trx: Knex = this.knx) => {
    return new BaseRepo(dbTables.todoList, trx);
  };
}
