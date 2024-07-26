import { Knex, knex } from "../../node_modules/knex/types/index";
import knx from "./knex";
import { WhereType, repoInterface } from "./types/repo";
import { TodoRecord } from "./types/todo";

export class BaseRepo<T> implements repoInterface<T> {
  knx: Knex;

  constructor(public tableName: Knex.TableDescriptor, public trx: Knex) {
    this.tableName = tableName;
    //option to instantiate with a transaction for testing env
    if (trx) {
      this.knx = trx;
    } else {
      this.knx = knx;
    }
  }

  async get(
    where: WhereType = {},
    select: string = "*",
    trx: Knex = this.knx
  ): Promise<T[]> {
    const baseQuery = await trx(this.tableName).where(where).select(select);

    return baseQuery;
  }

  createTransaction() {
    return this.knx.transaction();
  }

  async commitTransaction(trx) {
    if (!trx || !trx.isTransaction) {
      throw new Error("Transaction is not defined!");
    }
    try {
      await trx.commit();
    } catch {
      await trx.rollback();
    }
  }

  async rollbackTransaction(trx) {
    if (!trx || !trx.isTransaction) {
      throw new Error("Transaction is not defined!");
    }
    await trx.rollback();
  }
}
