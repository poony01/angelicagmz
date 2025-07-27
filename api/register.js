import { createClient } from "@supabase/supabase-js";

// Cria o cliente do Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export const config = {
  api: {
    bodyParser: false, // desativa o bodyParser interno da Vercel
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // Lê o corpo da requisição manualmente
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const bodyData = Buffer.concat(buffers).toString();
    const { name, email, password } = JSON.parse(bodyData);

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
