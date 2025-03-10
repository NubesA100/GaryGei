const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000; // Puedes cambiar el puerto si es necesario

// Middleware
app.use(cors()); // Permite solicitudes desde el frontend
app.use(bodyParser.json()); // Convierte el body en JSON

// Configurar conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin_user',
    password: 'eminem1710',
    database: 'visiondigital',
    port: 3307 // Asegúrate de que es el puerto correcto
});

// Conectar a la base de datos
connection.connect(err => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos');
});

// Ruta para guardar datos del formulario
app.post('/registrar', (req, res) => {
    const { nombre, edad, tipo, estado, email, telefono, pais } = req.body;

    // Verificar que todos los datos están presentes
    if (!nombre || !telefono || !pais || !estado || !edad) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Query SQL para insertar los datos
    const query = 'INSERT INTO asistentes (nombre, edad, tipo, estado, email, telefono, pais) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [nombre, edad, tipo, estado, email, telefono, pais];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error('Error al insertar datos:', error);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        res.status(200).json({ message: 'Registro exitoso', id: results.insertId });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
