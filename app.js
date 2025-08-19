import express from "express";
import dotenv from "dotenv";
import { initDB } from "./src/config/database.js";
dotenv.config();
const app = express();
app.use(express.json());
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