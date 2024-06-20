CREATE TABLE todo_list (
    id int primary key,
    task varchar(255),
    due_at timestamp,
    created_at timestamp,
    updated_at timestamp,
    complete BOOLEAN
    )