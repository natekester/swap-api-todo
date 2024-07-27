import { Knex } from "../../node_modules/knex/types/index";
import knx from "./knex";

export class BaseRepo<RecordType> {
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
    where: Partial<RecordType> = {},
    select: string = "*",
    trx: Knex = this.knx
  ): Promise<RecordType[]> {
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
