import { RepositoryFactory } from "../factories/repo.factory.js";
import { getKnex } from "../repos/knex.js";
import { Repo } from "../repos/types/repo.js";

export class TodoService {
  todoRepo: Repo<TodoRecord>;
  constructor() {
    const knex = getKnex();
    const repoFactory = new RepositoryFactory(knex);
    this.todoRepo = repoFactory.createTodoListRepo();
  }

  //todoRecord type represents the shape of the table being interacted with
  getAllTodos = async (): Promise<TodoRecord[]> => {
    const todoRecords = await this.todoRepo.get({});
    return todoRecords;
  };
}
