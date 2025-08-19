import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req,res) => {
    res.send("Hola mundo");
});

app.listen(process.env.PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
})
