import { pool } from "../db/db.js";

const login = async (req, res) => {
    const { email, contrasena } = req.body;

    const [rows] = await pool.query(
        "SELECT * FROM enmpleado WHERE usuario = ? AND contrasena = ?",
        [email, contrasena]
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