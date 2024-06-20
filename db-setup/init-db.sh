# psql todo.table.sql

psql -p 5432 -h localhost -d postgres -U postgres  -f "db-setup/migrations/initialize.sql" 
psql -p 5432 -h localhost -d todo_swap -U postgres  -f "db-setup/migrations/todo.table.sql"
psql -p 5432 -h localhost -d todo_swap_test -U postgres  -f "db-setup/migrations/todo.table.sql"