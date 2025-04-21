import { Application } from "@oak/oak";

import router from "./routes/todos.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 3000 });
