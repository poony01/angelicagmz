// register.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const { data, error } = await supabase
      .from('usuarios')
      .insert([{ name, email, phone, password }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: 'Usuário cadastrado com sucesso', user: data });
  } catch (e) {
    return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
}
