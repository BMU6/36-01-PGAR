import "#db";
import express from "express";
import cors from "cors";

import {
  userRoutes,
  productRoutes,
  orderRoutes,
  categoryRoutes,
} from "#routes";

import { errorHandler, notFoundHandler } from "#middlewares";

console.log('Ist da jemand');

const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use(cors());

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/categories", categoryRoutes);
app.use("*splat", notFoundHandler);
app.use(errorHandler);
app.listen(port, () =>
  console.log(`\x1b[34mMain app listening at http://localhost:${port}\x1b[0m`),
);
