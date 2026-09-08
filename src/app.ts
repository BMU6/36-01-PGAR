import express from "express";
import { userRouter} from "#routes";
import "#db";
import { errorHandler } from "#middleware";

console.log('Ist da jemand');

const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use("/users", userRouter);
// app.use("/products", useProducts);
// app.use("/categories", useCategories);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
