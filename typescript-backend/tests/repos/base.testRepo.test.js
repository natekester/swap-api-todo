import knx from "../../src/repos/knex";

import { v4 as uuidV4 } from "uuid";
import { RepositoryFactory } from "../../src/factories/repo.factory";
import { dbTables } from "../../src/repos/dbtables";

describe("test the base repository", () => {
  it("tests the method find", async () => {
    console.log(uuidV4, "test");
  });

  let topTrx, trx;
  let todoTestRepo;
  let todoRepository;

  beforeAll(async () => {
    //top level transactions to enable sub transactions
    topTrx = await knx.transaction();
  });

  beforeEach(async () => {
    //sub transaction of top transaction
    trx = await topTrx.transaction();

    const repoFactory = new RepositoryFactory(trx);
    todoRepository = repoFactory.createTodoListRepo();
  });

  afterEach(async () => {
    await trx.rollback();
  });
  afterAll(async () => {
    await topTrx.rollback();
  });

  it("tests the method find", async () => {
    const record = await todoRepository.find({ id: session1Id });

    expect(record).toIncludeAllPartialMembers([session1]);
  });

  it("tests the transaction(trx) functionality - collecting from parent trx CAN SEE subTRX record", async () => {
    const newRecord = await todoTestRepo.generateData();

    const transaction = await todoRepository.createTransaction();

    const [record] = await todoRepository.insert(newRecord, transaction);

    //NOTE - higher level transactions have the ability to read from child sub-transactions
    const recordCollectedFromParentTrx = await todoRepository.findById(
      record.id
    );

    //rolling back transaction to close it
    await todoRepository.rollbackTransaction(transaction);

    //parent trx to the trx can still find the record
    expect(recordCollectedFromParentTrx).toStrictEqual(newRecord);
  });

  it("tests the transaction(trx) functionality - rollback works", async () => {
    const newRecord = await todoTestRepo.generateData();

    const transaction = await todoRepository.createTransaction();

    const [record] = await todoRepository.insert(newRecord, transaction);

    const sessionRepoWriteConn = createPESessionRepo();

    //rollback transaction so we can read from standardConnection
    await todoRepository.rollbackTransaction(transaction);

    //transaction of insert is now rolled back, so should not be findable from just write connection
    const recordShouldBeFoundCommitted = await sessionRepoWriteConn.findById(
      record.id
    );

    //rolling back makes it so it never happened, and can't be found
    expect(recordShouldBeFoundCommitted).toBeUndefined();
  });
});
