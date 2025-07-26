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

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, password }]);

    if (error) {
      console.error("Erro ao registrar:", error.message);
      return res.status(400).json({ error: "Erro ao registrar. " + error.message });
    }

    return res.status(200).json({ message: "Usuário registrado com sucesso!" });
  } catch (err) {
    console.error("Erro geral:", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}
