import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const filePath = path.resolve(process.cwd(), 'users.json');
    let users = [];

    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      try {
        users = JSON.parse(fileData);
      } catch (err) {
        console.error('Erro ao ler JSON:', err);
      }
    }

    const emailExistente = users.find(user => user.email === email);
    if (emailExistente) {
      return res.status(400).json({ message: 'E-mail já cadastrado.' });
    }

    const novoUsuario = { name, email, phone, password, isAdmin: false, plano: null, dataPlano: null };
    users.push(novoUsuario);

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    return res.status(200).json({ message: 'Cadastro realizado com sucesso!' });
  }

  return res.status(405).json({ message: 'Método não permitido.' });
}
