/*
src/components/ReceiveImages.js
Funcion: Componente que recibe las imagens, las convierte
a Base64 y las envía a la API comparaimagens
Fecha: 13 Agosto 2024
Version: 0.0.1
Framework: NodeJS
Autor: Victor Munoz
Proyecto: Preparacion para proyecto Movilidad
*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';

//recibimos las imagenes 
const ReceiveImages = ({ images }) => {
const [comparisonResult, setComparisonResult] = useState(null);

//Se envpian a la API
useEffect(() => {
  if (images.image1 && images.image2) {
    console.log('Imagen 1 recibida:', images.image1);
    console.log('Imagen 2 recibida:', images.image2);

    const compareImages = async () => {
      try {
        const response = await axios.post('https://6o5jy4b309.execute-api.us-east-1.amazonaws.com/dev/compareimages', {
          image1: images.image1,
          image2: images.image2
        }); 

        // Actualiza el estado con el resultado de la comparación
        setComparisonResult(response.data);
        console.log('estatus',response.status,response.data);
      } catch (error) {
        console.error('Error al comparar imágenes:', error);
        setComparisonResult('Error al comparar imágenes');
      }
    };
    compareImages();
  }
}, [images]);

//Mostramos las imagenes en el front
  return (
    <div>
      <h1>Imágenes Recibidas</h1>
      <p>Revisa la consola para ver las imágenes recibidas.</p>
      <h2>Imagen 1:</h2>
      <img src={images.image1} alt="Imagen 1" style={{ maxWidth: '300px', maxHeight: '300px' }} />
      <h2>Imagen 2:</h2>
      <img src={images.image2} alt="Imagen 2" style={{ maxWidth: '300px', maxHeight: '300px' }} />
      <h2>Resultado de Comparación:</h2>
      <pre>{JSON.stringify(comparisonResult, null, 2)}</pre>
    </div>
  );
};

export default ReceiveImages;

