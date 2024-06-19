import knx from "./knex.js";

export class BaseDb {
  tableName: string;
  knx: typeof knx;

  constructor(tableName: string, trx: typeof knx) {
    this.tableName = tableName;
    //option to instantiate with a transaction for testing env
    if (trx) {
      this.knx = trx;
    } else {
      this.knx = knx;
    }
  }

  get(where = {}, select = "*", trx = this.knx) {
    const baseQuery = trx(this.tableName).where(where).select(select);

    return baseQuery;
  }

  createTransaction() {
    return this.knx.transaction();
  }

  async commitTransaction(trx: typeof knx) {
    if (!trx || !trx.isTransaction) {
      throw new Error("Transaction is not defined!");
    }
    try {
      await trx.commit();
    } catch {
      await trx.rollback();
    }
  }

  async rollbackTransaction(trx: typeof knx) {
    if (!trx || !trx.isTransaction) {
      throw new Error("Transaction is not defined!");
    }
    await trx.rollback();
  }
}
