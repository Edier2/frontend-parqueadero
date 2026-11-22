import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dirección del backend: en Railway se define como variable de entorno API_URL
const API_URL = (process.env.API_URL || 'http://localhost:3001').replace(/\/$/, '');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('login', { API_URL });
});

app.get('/registro', (req, res) => {
    res.render('registro', { API_URL });
});

app.get('/bienvenida', (req, res) => {
    res.render('bienvenida');
});

app.get('/vehiculos', (req, res) => {
    res.render('vehiculos', { API_URL });
});

// Railway asigna el puerto por variable de entorno
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Frontend corriendo en el puerto ${PORT}`);
});
