import { pool } from "../db/db.js";

const login = async (req, res) => {
    const { nombre, contrasena } = req.body;

    const [rows] = await pool.query(
        "SELECT * FROM empleado WHERE nombre = ? AND contrasena = ?",
        [nombre, contrasena]
    );
    if (rows.length > 0) {
        res.json({
            message: "Bienvenido",
        });
    } else {
        res.json({
            message: "nombre de usuario o contraseña incorrectos",
        });
    }
};

export default login;