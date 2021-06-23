require('dotenv').config();

const express = require('express');
var cors = require('cors')

//Configurar CORS
app.use( cors() );

const { dbConnection } = require('./database/config');

//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//Rutas
app.get('/', (req, res) => res.send('Hello World!'));

app.listen( process.env.PORT , () => console.log(`Port ${process.env.PORT}`) );