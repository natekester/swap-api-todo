import { Knex } from "../../node_modules/knex/types/index";

export interface repoInterface {
  get(where: object, select?: string, trx?: Knex): Promise<object[]>;
  createTransaction(): Promise<Knex>;
  rollbackTransaction(trx: Knex): Promise<void>;
  commitTransaction(trx: Knex): Promise<void>;
  tableName: string;
}
