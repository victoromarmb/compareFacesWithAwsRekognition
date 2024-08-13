/*
src/components/UploadImages.js
Funcion: Componente que permite subir dos imagenes del dispositivo
Fecha: 13 Agosto 2024
Version: 0.0.1
Framework: NodeJS
Autor: Victor Munoz
Proyecto: Preparacion para proyecto Movilidad
*/

import React, { useState } from 'react';

const UploadImages = ({ onImagesUpload }) => {
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');

  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage1(reader.result);
    };
  };

  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage2(reader.result);
    };
  };

  const handleSubmit = () => {
    if (typeof onImagesUpload === 'function') {
      onImagesUpload({ image1, image2 });
    } else {
      console.error("onImagesUpload no es una función válida.");
    }
  };

  return (
    <div>
      <h1>Selecciona dos imagenes para compararlas</h1>
      <input type="file" accept="image/*" onChange={handleImageChange1} />
      <input type="file" accept="image/*" onChange={handleImageChange2} />
      <button onClick={handleSubmit}>Enviar Imágenes</button>
    </div>
  );
};

export default UploadImages;
