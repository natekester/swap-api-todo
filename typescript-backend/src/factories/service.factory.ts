import { TodoService } from "../service/todo.service";

export class ServiceFactory {
  constructor() {}

  createTodoListService = () => {
    return new TodoService();
  };
}
