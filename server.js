const express = require('express');
const cors = require('cors');
const worlds = require('./worlds.json');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Helper function to translate world data (default language: English)
function formatWorld(world, lang) {
  const selectedLang = ['en', 'es', 'ja'].includes(lang) ? lang : 'en';

  return {
    id: world.id,
    name: world.name[selectedLang] || world.name.en,
    origin: world.origin[selectedLang] || world.origin.en,
    type: world.type,
    games: world.games,
    field_theme: world.field_theme,
    battle_theme: world.battle_theme
  };
}

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Kingdom Hearts Worlds API! Access /api/v1/worlds to view all worlds.');
});

// Endpoint 1: Get all worlds (Default: English. Supports ?lang=es or ?lang=ja)
app.get('/api/v1/worlds', (req, res) => {
  const { lang } = req.query;
  const formattedWorlds = worlds.map(w => formatWorld(w, lang));
  res.json(formattedWorlds);
});

// Endpoint 2: Get a single world by ID
app.get('/api/v1/worlds/:id', (req, res) => {
  const { lang } = req.query;
  const worldFound = worlds.find(w => w.id === req.params.id);

  if (worldFound) {
    res.json(formatWorld(worldFound, lang));
  } else {
    res.status(404).json({ error: "World not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});