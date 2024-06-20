import toCamelCase from "camelcase-keys";
import initializeKnex from "knex";
import { snakeCase as toSnakeCase } from "snake-case";
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
  console.log({ isTest });

  return {
    client: "postgresql",
    asyncStackTraces: true,
    connection: {
      host: POSTGRES_HOST,
      user: POSTGRES_USER,
      database: isTest ? TEST_DATABASE_NAME : POSTGRES_DATABASE_NAME,
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

export const knx = initializeKnex(knexConfig());

export default knx;
