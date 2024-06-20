SELECT
    'CREATE DATABASE todo_swap'
WHERE
    NOT EXISTS (
        SELECT
        FROM
            pg_database
        WHERE
            datname = 'CREATE DATABASE todo_swap')\gexec

SELECT
    'CREATE DATABASE todo_swap_test'
WHERE
    NOT EXISTS (
        SELECT
        FROM
            pg_database
        WHERE
            datname = 'CREATE DATABASE todo_swap_test')\gexec