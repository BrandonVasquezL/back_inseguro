import { Router } from "express";
import {
    obtenerEmpleados,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado,
    empleadoPorId,
} from "../controller/empleado.controller.js";

const router = Router();

router.get("/empleado", obtenerEmpleados);

router.get("/empleado/:id", empleadoPorId);

router.post("/empleado", crearEmpleado);

router.put("/empleado/:id", actualizarEmpleado);

router.delete("/empleado/:id", eliminarEmpleado);

export default router;