/*
src/App.js
Funcion: App para enviar a comparar dos imagenes
Fecha: 13 Agosto 2024
Version: 0.0.1
Framework: NodeJS
Autor: Victor Munoz
Proyecto: Preparacion para proyecto Movilidad
*/

import React, { useState } from 'react';
import UploadImages from './components/UploadImage';
import ReceiveImages from './components/ReceiveImages';

const App = () => {
  const [images, setImages] = useState({});

  return (
    <div>
      <UploadImages onImagesUpload={setImages} />
      <ReceiveImages images={images} />
    </div>
  );
};

export default App;

