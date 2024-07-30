import { Knex } from "../../../node_modules/knex/types/index.js";

type WhereType = Partial<{
  id: string;
  updatedAt: string;
  createdAt: string;
}>;

export interface Repo<RecordType> {
  knx?: Knex;
  tableName?: Knex.TableDescriptor;
  get(
    where: Partial<RecordType>,
    select?: string,
    trx?: Knex
  ): Promise<RecordType[]>;
  createTransaction(): Promise<Knex>;
  rollbackTransaction(trx: Knex): Promise<void>;
  commitTransaction(trx: Knex): Promise<void>;
}
