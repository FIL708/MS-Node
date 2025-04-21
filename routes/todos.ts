import { Router } from "@oak/oak";

interface Todo {
    id: string;
    text: string;
}
let todos: Todo[] = [];

const router = new Router();

router.get("/todos", (ctx) => {});

router.post("/todos", (ctx) => {});

router.put("/todos/:todoId", (ctx) => {});

router.delete("/todos/:todoId", (ctx) => {});

export default router;
