const express = require('express');
const cors = require('cors');
const lessonRoutes = require('./routes/lessonRoutes');
const challengeRoutes = require('./routes/challengeRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/lessons', lessonRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/auth', authRoutes);

// Ruta base
app.get('/', (req, res) => {
    res.json({ message: 'API de =Formula() funcionando correctamente' });
});

module.exports = app;