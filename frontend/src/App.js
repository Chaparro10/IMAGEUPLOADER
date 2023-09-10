import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [uploadedImageName, setUploadedImageName] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Por favor, selecciona una imagen primero.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:4000/api/subir', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        const imageName = await response.text();
        setUploadedImageName(imageName);
        // Realiza una solicitud GET adicional con el nombre del archivo
        const imageURL = `http://localhost:4000/api/subir/${imageName}`;
        setUploadedImageURL(imageURL);
        console.log(imageURL)
       
      }
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
    }
  };

  return (
    <div className="App">
      <h1>Subir Imagen</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir</button>

      {uploadedImageName && (
        <div>
          <h2>Imagen Cargada</h2>
          <img src={uploadedImageURL} alt="Imagen Cargada" />
        </div>
      )}
    </div>
  );
}

export default App;
