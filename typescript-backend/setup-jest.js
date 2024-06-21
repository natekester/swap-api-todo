// import "dotenv/config.js";

import knx from "./src/repos/knex";

beforeEach(async () => {
  await knx.raw("BEGIN");
});
afterEach(async () => {
  await knx.raw("ROLLBACK");
});

afterAll(async () => {
  await knx.destroy();
});
