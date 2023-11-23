import { pool } from "../db/db.js";

const obtenerEmpleados = async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM empleado");
    res.json(rows);
};

const empleadoPorId = async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM empleado WHERE id = ?", [
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
    const { nombre, email, contrasena } = req.body;
    console.log(nombre, email, contrasena);
    const [rows] = await pool.query(
        "INSERT INTO empleado VALUES (null, ?, ?, ?)",
        [nombre, email, contrasena]
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
        "UPDATE empleado SET nombre = IFNULL(?, nombre), email = IFNULL(?, email), contrasena = IFNULL(?, contrasena) WHERE id = ?",
        [nombre, email, contrasena, id]
    );
    if (rows.affectedRows >= 0) {
        res.send({ message: "Empleado actualizado correctamente" });
    } else {
        res.send({ message: "Error al actualizar al empleado" });
    }
};

const eliminarEmpleado = async (req, res) => {
    const [rows] = await pool.query("DELETE FROM empleado WHERE id = ?", [
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