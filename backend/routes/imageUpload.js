const express = require('express');
const multer = require('multer');
const path = require('path');


const router = express.Router();

// Configuración de multer para el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads'); // Directorio donde se guardarán las imágenes
  },
  filename: (req, file, callback) => {
    const originalName = file.originalname;
    callback(null, originalName);
  },
});





const upload = multer({ storage: storage });

const imageController = require('../controllers/ImageUpload.controller'); // Importa el controlador de imágenes

// Ruta para cargar una imagen
router.post('/', upload.single('image'), imageController.uploadImage);

//router.route('/')
 //.post(imageController.uploadImage);

// Ruta para mostrar una imagen por su nombre
router.get('/:imageName', imageController.getImageByName);

module.exports = router;
