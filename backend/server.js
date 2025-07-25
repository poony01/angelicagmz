// backend/server.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { checkAuth } from './utils/authMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

const usersPath = path.join(__dirname, 'users.json');
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Criação de conta
app.post('/api/register', (req, res) => {
  const { name, email, phone, password } = req.body;
  let users = [];
  if (fs.existsSync(usersPath)) {
    users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
  }

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'E-mail já cadastrado.' });
  }

  users.push({ name, email, phone, password });
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  res.status(201).json({ message: 'Usuário registrado com sucesso!' });
});

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    return res.status(200).json({ message: 'Login realizado com sucesso' });
  } else {
    return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
