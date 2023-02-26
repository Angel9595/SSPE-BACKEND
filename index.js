const express = require('express');
const { dbConnection } = require('./database/config');
var cors = require('cors')


//instanciar el servidor de express
const app = express();
//inicializar variables de entorno
require('dotenv').config();

//configuracion cors
app.use(cors());


//lectura y parseo del body 
app.use(express.json());



//Ruta principal usuarios
app.use('/SSPE/users', require('./routes/users'));
//Ruta principal Login
app.use('/SSPE/login', require('./routes/auth'));
//Ruta principal formulario usuario
app.use('/SSPE/formRegister', require('./routes/formRegister'));
//Ruta principal de carga de archivos
app.use('/SSPE/upload', require('./routes/uploads'));



//inicializacion base de datos
dbConnection();

//app corriendo en puerto 
app.listen(process.env.PORT, () => {
    console.log('puerto corriendo en puerto ' + process.env.PORT)
})

