# psql todo.table.sql

psql -p 5432 -h localhost -d postgres -U postgres  -f "db-setup/migrations/initialize.sql" 
psql -p 5432 -h localhost -d todo_list_local -U postgres  -f "db-setup/migrations/todo.table.sql"
psql -p 5432 -h localhost -d todo_list_local_test -U postgres  -f "db-setup/migrations/todo.table.sql"