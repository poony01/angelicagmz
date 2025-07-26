// register.js

// Inicialize o Supabase
const supabase = supabase || createClient(
  "https://SEU_SUPABASE_URL.supabase.co", // substitua pelo seu
  "SEU_SUPABASE_ANON_KEY"                 // substitua pelo seu
);

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !phone || !password) {
    alert("Todos os campos são obrigatórios.");
    return;
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .insert([{ name, email, phone, password }]);

    if (error) {
      console.error("Erro ao registrar:", error.message);
      alert("Erro ao registrar: " + error.message);
      return;
    }

    alert("Conta criada com sucesso!");
    window.location.href = "/login.html";
  } catch (err) {
    console.error("Erro inesperado:", err);
    alert("Erro inesperado ao registrar.");
  }
});
