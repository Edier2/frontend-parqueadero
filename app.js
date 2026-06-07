import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/bienvenida', (req, res) => {
    res.render('bienvenida');
});

app.get('/vehiculos', (req, res) => {
    res.render('vehiculos');
});
app.get('/', (req, res) => {
    res.render('login');
});

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Frontend corriendo en http://localhost:${PORT}`);
});

app.post('/login', async (req, res) => {
    const { usuario, password } = req.body;

    const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password })
    });

    const data = await response.json();

    if (data.token) {
        return res.send(`Login correcto. Token: ${data.token}`);
    }

    res.send('Error en login');
});