import express from "express";
import dotenv from "dotenv";
import { initDB } from "./src/config/database.js";
import "./src/models/associations.js"; // Importar las relaciones
import userRouter from "./src/routes/user.routes.js";
import taskRouter from "./src/routes/taks.routes.js";
import userProfileRouter from "./src/routes/user_profile.routes.js";
import categoryRouter from "./src/routes/category.routes.js";
import taskCategoryRouter from "./src/routes/task_category.routes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/user-profiles", userProfileRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/task-categories", taskCategoryRouter);
export const PORT = process.env.PORT;
app.get("/", (req,res) => {
    res.send("Hola mundo");
});

app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})

initDB()
// .then(() =>{
//     app.listen(PORT, ()=> {
//         console.log(`Servidor corriendo en el puerto ${PORT}`);
//     });
// })