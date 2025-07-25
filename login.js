// login.js
import fs from 'fs';
import path from 'path';

const OWNER_EMAIL = "angelicagmz@gmail.com"; // seu e-mail de ADM

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  const usersPath = path.resolve('users.json');

  const users = fs.existsSync(usersPath)
    ? JSON.parse(fs.readFileSync(usersPath))
    : [];

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: 'E-mail ou senha inválidos.' });

  const isAdmin = user.email === OWNER_EMAIL;
  res.status(200).json({
    message: 'Login realizado com sucesso.',
    redirect: isAdmin ? 'admin.html' : 'home.html',
    user: { email: user.email, isAdmin, isPaid: user.isPaid }
  });
}
