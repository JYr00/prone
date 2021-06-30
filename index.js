require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');


// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();

//-Rutas
// Users
app.use('/api/users', require('./routes/users.routes'));

// Auth
app.use('/api/login', require('./routes/auth.routes'));

app.listen( process.env.PORT , () => console.log(`Port ${process.env.PORT}`) );