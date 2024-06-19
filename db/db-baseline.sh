# psql todo.table.sql
psql -p 5432 -h localhost -d postgres  -U postgres  -f "db/migrations/todo.table.sql"