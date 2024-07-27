import { Router } from "express";
import { ServiceFactory } from "../factories/service.factory";
import { TodoService } from "../service/todo.service";

class TodoRoutes {
  router = Router();
  service: TodoService;

  constructor() {
    const serviceFactory = new ServiceFactory();
    this.service = serviceFactory.createTodoListService();
    this.router.get("/all", this.getTodos);
  }

  getTodos = async (req, res) => {
    console.log("test");
    const allTodos = await this.service.getAllTodos();

    return res.json({
      todos: allTodos,
    });
  };
}

export default new TodoRoutes().router;
