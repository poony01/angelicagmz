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
      .from("users")
      .insert([{ nome, email, senha }]);

    if (error) {
      console.error("Erro Supabase:", error.message);
      return res.status(500).json({ error: "Erro ao registrar" });
    }

    return res.status(200).json({ message: "Registro bem-sucedido" });
  } catch (err) {
    console.error("Erro geral:", err.message);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}
