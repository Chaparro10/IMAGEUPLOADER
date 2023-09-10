const fs = require('fs').promises; // Importa fs.promises en lugar de fs
const path = require('path');


// Ruta donde se almacenan las imágenes
const imagePath = path.join(__dirname, '../uploads/');

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No se ha seleccionado ninguna imagen.');
    }

    // Mueve el archivo cargado a la carpeta de almacenamiento
    const tempPath = req.file.path;
    const targetPath = path.join(imagePath, req.file.filename);

    // Mueve el archivo a la ubicación deseada
    await fs.rename(tempPath, targetPath);

    // Realiza acciones adicionales aquí, como guardar la ubicación del archivo en la base de datos, si es necesario.
    res.status(200).send(req.file.filename);
  } catch (error) {
    console.error('Error al cargar la imagen:', error);
    res.status(500).send('Error al cargar la imagen.');
  }
};

const getImageByName = async (req, res) => {
  const imageName = req.params.imageName;
  const filePath = path.join(imagePath, imageName);

  try {
    // Verifica si la imagen existe en el directorio de almacenamiento
    await fs.access(filePath);
    // Si la imagen existe, la envía como respuesta
    res.sendFile(filePath);
  } catch (error) {
    // Si la imagen no existe, devuelve una respuesta de error o una imagen predeterminada
    res.status(404).send('Imagen no encontrada.');
  }
};

module.exports = {
  uploadImage,
  getImageByName
};
