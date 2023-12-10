import { pool } from "../db/db.js";
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    const { nombre, contrasena } = req.body;

    const [rows] = await pool.query(
        "SELECT * FROM empleado WHERE nombre = ? AND contrasena = ?",
        [nombre, contrasena]
    );

    if (rows.length > 0) {
        const token = jwt.sign({ id: rows[0].idEmpleado, nombre: rows[0].nombre }, 'tu_secreto');
        res.json({
            message: "Bienvenido",
            token: token
        });
    } else {
        res.json({
            message: "nombre de usuario o contraseña incorrectos",
        });
    }
};

export default login;
