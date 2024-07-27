import { Knex } from "../../node_modules/knex/types/index";
knex
import { BaseRepo } from "../repos/base.repo";
import { dbTables } from "../repos/dbtables";
import knex from "../repos/knex";

//enabling us to easily extend off of base class later

export class RepositoryFactory {
  knx: Knex;
  constructor(trx: Knex ) {
    this.knx = trx;
  }

  //todoRecord type represents the shape of the table being interacted with
  createTodoListRepo = (trx: Knex = this.knx) => {
    return new BaseRepo<TodoRecord>(dbTables.todoList, trx);
  };
}
