import KnexInitialization from "knex";
// @ts-ignore
import toCamelCase from "camelcase-keys";
// @ts-ignore
import { snakeCase as toSnakeCase } from "snake-case";
// @ts-ignore
import { isArray, isObject } from "lodash-es";
import { Knex, QueryBuilder } from "../../node_modules/knex/types/index";

type postProcessResponseType = (
  result: Array<object> | object
) => Array<object> | object;

type knexConfigType = {
  client: string;
  asyncStackTraces: boolean;
  connection: {
    host: string;
    user: string;
    database: string;
  };
  pool: {
    min: number;
    max: number;
  };
  debug: boolean;
  postProcessResponse: postProcessResponseType;
  wrapIdentifier: (
    value: string,
    functionToWrap: (string: string) => string
  ) => any;
};

const knexConfig = (): Partial<knexConfigType> | any => {
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

//let's make sure that we only ever get one knex connection for pooling
let knex = null;

export function getKnex() {
  if (!knex) {
    knex = KnexInitialization(knexConfig());
  }
  return knex;
}

export default getKnex();
