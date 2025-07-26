// api/register.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    // Verifica se já existe um usuário com esse e-mail
    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email);

    if (selectError) {
      console.error(selectError);
      return res.status(500).json({ message: 'Erro ao verificar usuário' });
    }

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'E-mail já cadastrado!' });
    }

    // Cria o novo usuário
    const { data, error: insertError } = await supabase
      .from('users')
      .insert([{ nome, email, senha }]);

    if (insertError) {
      console.error(insertError);
      return res.status(500).json({ message: 'Erro ao criar usuário' });
    }

    return res.status(200).json({ message: 'Conta criada com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno no servidor' });
  }
}
