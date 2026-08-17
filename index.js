const express = require('express');
const cors = require('cors');
const mundos = require('./mundos.json');

const app = express();
const PUERTO = 3000;

// Permitir que la API sea accesible por cualquiera
app.use(cors());

// Mensaje de bienvenida en la dirección principal
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de Kingdom Hearts! Ve a /api/mundos para ver la lista.');
});

// Ruta 1: Devuelve TODOS los mundos
app.get('/api/mundos', (req, res) => {
  res.json(mundos);
});

// Ruta 2: Devuelve UN solo mundo por su id (ejemplo: /api/mundos/agrabah)
app.get('/api/mundos/:id', (req, res) => {
  const mundoEncontrado = mundos.find(m => m.id === req.params.id);

  if (mundoEncontrado) {
    res.json(mundoEncontrado);
  } else {
    res.status(404).json({ mensaje: "Mundo no encontrado" });
  }
});

// Encender el servidor
app.listen(PUERTO, () => {
  console.log(`¡API lista! Servidor corriendo en http://localhost:${PUERTO}`);
});