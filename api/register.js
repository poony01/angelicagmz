// api/register.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    const { data, error } = await supabase
      .from("usuarios")
      .insert([{ nome, email, senha }]);

    if (error) {
      throw error;
    }

    res.status(200).json({ message: "Usuário registrado com sucesso", data });
  } catch (err) {
    console.error("Erro ao registrar:", err.message);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
}
