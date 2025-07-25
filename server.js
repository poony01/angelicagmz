// server.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const usersFile = path.join(__dirname, 'users.json');

// Rota de registro
app.post('/api/register', (req, res) => {
  const { name, email, phone, password } = req.body;

  const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8') || '[]');

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'E-mail já registrado.' });
  }

  users.push({ name, email, phone, password });
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.status(201).json({ message: 'Registrado com sucesso!' });
});

// Rota de login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8') || '[]');

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  res.json({ message: 'Login bem-sucedido!', user });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
