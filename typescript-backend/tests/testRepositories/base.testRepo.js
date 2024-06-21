export class TestRepository {
  constructor(conn, tableName) {
    if (!conn) {
      throw new Error("Needs a knex connection");
    }
    if (!tableName) {
      throw new Error("Needs tableName");
    }
    this.conn = conn;
    this.table = tableName;
  }

  async distinct(column_name) {
    return this.conn(this.table).select(column_name).distinct();
  }

  async exist(condition) {
    const exist = await this.conn(this.table)
      .select("id")
      .where(condition)
      .first();

    return exist.length !== 0;
  }

  async get(condition = {}) {
    const items = await this.conn(this.table).where(condition);
    return items;
  }

  async getOne(condition = {}) {
    const item = await this.conn(this.table).where(condition).first();
    return item;
  }

  async insert(data) {
    const [record] = await this.conn(this.table).insert(data).returning("*");
    return record;
  }

  async insertMany(data) {
    const items = await this.conn(this.table).insert(data).returning("*");
    return items;
  }

  async update(where, data) {
    const [output] = await this.conn(this.table)
      .where(where)
      .update({
        ...data,
        updatedAt: new Date().toUTCString(),
      })
      .returning("*");

    return output;
  }

  async updateOne(condition, data) {
    const [output] = await this.conn(this.table)
      .where(condition)
      .first()
      .update({
        ...data,
        updatedAt: new Date().toUTCString(),
      })
      .returning("*");

    return output;
  }

  async delete(condition) {
    await this.conn(this.table).where(condition).del();
  }

  //interface method that needs to be personalized on implemented table
  async generatedata(options) {
    throw new Error(
      "Generate data function not implemented yet, need to implement one to generate test data with Faker. see session.testRepo.js for an example."
    );
  }

  //create the record
  async generate(options = {}) {
    return this.insert(await this.generatedata(options));
  }

  //create many records
  async generateMany(times, options = {}) {
    const recordPromises = [];
    for (let i = 0; i < times; i++) {
      recordPromises.push(this.generate(options));
    }

    const generatedRecords = await Promise.all(recordPromises);
    return generatedRecords;
  }
}
