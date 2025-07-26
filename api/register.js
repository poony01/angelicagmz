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

  // Validação simples
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    // Tenta inserir (ajustar os nomes conforme a tabela real)
    const { data, error } = await supabase
      .from("users")
      .insert([{ nome: nome, email: email, senha: senha }]);

    if (error) {
      console.error("Erro Supabase:", error.message);
      return res.status(500).json({ error: "Erro ao registrar no banco de dados" });
    }

    return res.status(200).json({ message: "Registro bem-sucedido" });
  } catch (err) {
    console.error("Erro geral:", err.message);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}
