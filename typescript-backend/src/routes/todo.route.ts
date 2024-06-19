import { Router } from "express";

class TodoRoutes {
  router = Router();
  routePath = "todo";

  constructor() {
    const service = createTodoService();
    this.router.get(this.routePath, this.service.getTodos);
    this;
  }
}

export default new TodoRoutes().router;
