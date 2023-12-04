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

router.post("/empleadoC", crearEmpleado);

router.put("/empleadoU/:id", actualizarEmpleado);

router.delete("/empleadoD/:id", eliminarEmpleado);

export default router;