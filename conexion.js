const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // Habilita CORS

app.use(session({
    secret: 'mi-secreto', // Cambia esto con una cadena segura
    resave: false,
    saveUninitialized: true,
}));

app.use(express.static(__dirname + '/vista')); // Así Express servirá archivos estáticos desde el directorio 'vista'

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/vista/index.html');
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '278brandon',
    database: 'seguridad'
});

app.post('/vista/', function (req, res) {
    const { username, password } = req.body;

    connection.query('SELECT * FROM usuario WHERE nombre = ? AND contraseña = ?', [username, password], function (error, results, fields) {
        console.log(`consulta realizada`);
        if (error) {
            console.error('Error en la consulta:', error);
            res.status(500).json({ error: 'Error en la autenticación.' });
            return;
        }

        if (results.length > 0) {
            // Usuario autenticado
            req.session.user = username;
            res.json({ success: true });
        } else {
            // Usuario no autenticado
            res.status(401).json({ success: false, message: 'Credenciales incorrectas.' });
        }
    });
});

app.listen(port, function () {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
