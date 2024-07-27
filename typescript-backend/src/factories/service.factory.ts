import { TodoService } from "../service/todo.service.js";

export class ServiceFactory {
  constructor() {}

  createTodoListService = () => {
    return new TodoService();
  };
}
