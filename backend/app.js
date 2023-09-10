const express =require('express');
const cors =require('cors');
const multer = require('multer');

const app = express();

// Configuraciones del Servidor
app.set('port', process.env.PORT || 4000);


//middlewares
app.use(cors())//Permite hacer peticiones al servidor
app.use(express.json())//formato de archivo

//rutas
app.get('/',(req,res)=>{
    res.send('Bienvenidos a mexico');
});


//Ruta para la api de Subida Imagenes
app.use('/api/subir', require('./routes/imageUpload'));

module.exports=app;
