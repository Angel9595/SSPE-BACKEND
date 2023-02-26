const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false); // Añadir esta línea antes de la conexión

const dbConnection = async()=>{

    try {
        await mongoose.connect(process.env.URI_BD, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('conexion de base de datos establecida')
    } catch (error) {
        console.log(error)
        throw new Error('Error al conectar la base de datos')
    }

}
module.exports = {
    dbConnection:dbConnection
}