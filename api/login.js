import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const usersPath = path.resolve('users.json');
  if (!fs.existsSync(usersPath)) {
    return res.status(500).json({ message: 'Arquivo de usuários não encontrado.' });
  }

  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersPath));

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
  }

  res.status(200).json({
    message: 'Login realizado com sucesso.',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isPaid: user.isPaid
    }
  });
}
