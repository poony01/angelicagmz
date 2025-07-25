import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const usersPath = path.resolve('users.json');
  const { name, email, phone, password } = req.body;

  const users = fs.existsSync(usersPath)
    ? JSON.parse(fs.readFileSync(usersPath))
    : [];

  const userExists = users.some(user => user.email === email);
  if (userExists) return res.status(400).json({ message: 'E-mail já registrado.' });

  const newUser = {
    id: Date.now(),
    name,
    email,
    phone,
    password,
    isAdmin: false,
    isPaid: false
  };

  users.push(newUser);
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

  res.status(200).json({ message: 'Conta criada com sucesso.' });
}
