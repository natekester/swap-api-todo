import knx from "./knex";

export class BaseRepo {
  constructor(tableName, trx) {
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
