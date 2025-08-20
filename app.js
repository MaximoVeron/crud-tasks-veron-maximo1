import express from "express";
import dotenv from "dotenv";
import { initDB } from "./src/config/database.js";
import "./src/models/associations.js"; // Importar las relaciones
import userRouter from "./src/routes/user.routes.js";
import taskRouter from "./src/routes/taks.routes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);
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