import Knex from "knex";
// @ts-ignore
import toCamelCase from "camelcase-keys";
// @ts-ignore
import { snakeCase as toSnakeCase } from "snake-case";
// @ts-ignore
import { isArray, isObject } from "lodash-es";

const knexConfig = () => {
  const {
    POSTGRES_HOST,
    POSTGRES_DATABASE_NAME,
    POSTGRES_USER,
    TEST_DATABASE_NAME,
    CURRENT_ENV,
    NODE_ENV,
  } = process.env;


  const isTest = CURRENT_ENV === "test" || NODE_ENV === "test";

  return {
    client: "postgresql",
    asyncStackTraces: true,
    connection: {
      host: POSTGRES_HOST || "localhost",
      user: POSTGRES_USER || "postgres",
      database: isTest
        ? TEST_DATABASE_NAME || "todo_swap"
        : POSTGRES_DATABASE_NAME || "todo_swap_test",
    },
    pool: {
      min: 2,
      max: 10,
    },
    debug: true,
    postProcessResponse: (result) =>
      isArray(result) || isObject(result) ? toCamelCase(result) : result,
    wrapIdentifier: (value, originalFunctionToWrap) =>
      value === "*"
        ? originalFunctionToWrap(value)
        : originalFunctionToWrap(toSnakeCase(value)),
  };
};

export const knx = Knex(knexConfig());

export default knx;
