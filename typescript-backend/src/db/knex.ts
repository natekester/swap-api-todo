import { isArray, isObject } from "lodash-es";
import toCamelCase from "camelcase-keys";
import { snakeCase as toSnakeCase } from "snake-case";
import initializeKnex from "knex";

const knexConfig = () => {
  const {
    POSTGRES_HOST,
    POSTGRES_DATABASE_NAME,
    POSTGRES_USER,
    TEST_DATABASE_NAME,
    CURRENT_ENV,
  } = process.env;

  const isTest: boolean = CURRENT_ENV === "test";

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
    debug: !isTest,
    postProcessResponse: (result) =>
      isArray(result) || isObject(result) ? toCamelCase(result) : result,
    wrapIdentifier: (value, originalFunctionToWrap) =>
      value === "*"
        ? originalFunctionToWrap(value)
        : originalFunctionToWrap(toSnakeCase(value)),
  };
};

export const knx = initializeKnex(knexConfig());

export const KnexType = typeof knx;

export default knx;
