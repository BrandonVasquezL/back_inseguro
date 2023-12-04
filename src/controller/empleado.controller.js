import { pool } from "../db/db.js";

const obtenerEmpleados = async (req, res) => {
    const [rows] = await pool.query("SELECT e.idEmpleado, e.nombre, e.contrasena, r.rol AS rol FROM empleado e JOIN rol r ON e.idRol = r.idRol");
    res.json(rows);
};

const empleadoPorId = async (req, res) => {
    const [rows] = await pool.query("SELECT e.idEmpleado, e.nombre, e.contrasena, r.rol AS rol FROM empleado e JOIN rol r ON e.idRol = r.idRol WHERE idEmpleado = ?", [
        req.params.id,
    ]);
    if (rows.length <= 0) {
        return res.status(404).json({
            message: "Empleado no encontrado",
        });
    }
    res.json(rows[0]);
};

const crearEmpleado = async (req, res) => {
    const { nombre, contrasena, idRol } = req.body;
    console.log(nombre, contrasena, idRol);
    const [rows] = await pool.query(
        "INSERT INTO empleado VALUES (null, ?, ?, ?)",
        [nombre, contrasena, idRol]
    );
    const affectedRows = rows.affectedRows;
    if (affectedRows > 0) {
        res.status(201).send({ message: "Empleado creado correctamente" });
    } else {
        res.send({ message: "Error al crear al empleado" });
    }
};

const actualizarEmpleado = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, contrasena } = req.body;
    const [rows] = await pool.query(
        "UPDATE empleado SET nombre = IFNULL(?, nombre), email = IFNULL(?, contrasena), contrasena = IFNULL(?, idRol) WHERE id = ?",
        [nombre, email, contrasena, id]
    );
    if (rows.affectedRows >= 0) {
        res.send({ message: "Empleado actualizado correctamente" });
    } else {
        res.send({ message: "Error al actualizar al empleado" });
    }
};

const eliminarEmpleado = async (req, res) => {
    const [rows] = await pool.query("DELETE FROM empleado WHERE idEmpleado = ?", [
        req.params.id,
    ]);
    if (rows.affectedRows > 0) {
        res.send({ message: "Empleado eliminado correctamente" });
    } else {
        res.send({ message: "No se pudo eliminar al empleado" });
    }
};

export {
    obtenerEmpleados,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado,
    empleadoPorId,
};