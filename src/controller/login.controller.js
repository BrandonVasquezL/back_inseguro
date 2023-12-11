import { pool } from "../db/db.js";
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    const { nombre, contrasena } = req.body;

    const [rows] = await pool.query(
        "SELECT * FROM empleado WHERE nombre = ? AND contrasena = ?",
        [nombre, contrasena]
    );

    if (rows.length > 0) {
        const empleado = rows[0];

        if (empleado.idRol === 1 || empleado.idRol === 2) {
            const token = jwt.sign({ id: empleado.idEmpleado, nombre: empleado.nombre }, 'tu_secreto');
            res.json({
                message: "Bienvenido",
                token: token
            });
        } else {
            res.json({
                message: "Acceso no autorizado. El usuario no tiene el rol necesario."
            });
        }
    } else {
        res.json({
            message: "Nombre de usuario o contraseña incorrectos",
        });
    }
};

export default login;
