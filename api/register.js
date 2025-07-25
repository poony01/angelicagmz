import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { name, email, phone, password } = req.body;

  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email, phone, password }]);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return res.status(200).json({ message: 'Conta criada com sucesso', user: data[0] });
}
