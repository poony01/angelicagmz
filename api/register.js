import { createClient } from "@supabase/supabase-js";

// Inicializa Supabase com variáveis de ambiente
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Função para ler o corpo da requisição manualmente (necessário na Vercel)
async function getRequestBody(req) {
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  const data = Buffer.concat(buffers).toString();
  return JSON.parse(data);
}

// Handler da API
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { name, email, password } = await getRequestBody(req);

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

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
