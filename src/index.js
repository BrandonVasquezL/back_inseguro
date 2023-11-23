import express from "express";
import empleadoRoutes from "./routes/crud.routes.js";
import login from "./controller/login.controller.js";
import cors from "cors";
import { PORT } from "./config/config.js";
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/login", login);
app.use("/api/", empleadoRoutes);
app.use((req, res, next) => {
    res.status(404).send({
        message: "Endpoint no encontrado",
    });
});

app.listen(port, function () {
    console.log(`Servidor escuchando en el puerto ${port}`);
});