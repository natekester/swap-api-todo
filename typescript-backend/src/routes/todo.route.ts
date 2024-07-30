import { Router } from "express";
import { ServiceFactory } from "../factories/service.factory.js";
import { TodoService } from "../service/todo.service.js";
import { TodoRecord } from "../repos/types/todo.js";

class TodoRoutes {
  router = Router();
  service: TodoService;

  constructor() {
    const serviceFactory: ServiceFactory = new ServiceFactory();
    this.service = serviceFactory.createTodoListService();
    this.router.get("/all", this.getTodos);
  }

  getTodos = async (req, res) => {
    const allTodos: TodoRecord[] = await this.service.getAllTodos();

    return res.json({
      todos: allTodos,
    });
  };
}

export default new TodoRoutes().router;
