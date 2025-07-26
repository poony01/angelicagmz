import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    // Verifica se o e-mail já está em uso
    const { data: existing, error: errorCheck } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);

    if (existing && existing.length > 0) {
      return res.status(400).json({ error: "E-mail já cadastrado." });
    }

    // Cria novo usuário
    const { data, error } = await supabase.from("users").insert([
      {
        name,
        email,
        phone,
        password,
        plano: "free",
        liberado: false,
        expiracao: null,
      },
    ]);

    if (error) {
      return res.status(500).json({ error: "Erro ao cadastrar usuário." });
    }

    // Redireciona para home após cadastro
    res.writeHead(302, { Location: "/home.html" });
    res.end();
  } catch (e) {
    console.error("Erro interno:", e);
    res.status(500).json({ error: "Erro interno no servidor." });
  }
}
