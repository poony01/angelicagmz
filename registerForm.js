// registerForm.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!nome || !email || !senha) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, email, senha })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registro realizado com sucesso!");
        window.location.href = "/home.html"; // ou outra tela desejada
      } else {
        alert(data.error || "Erro ao registrar.");
      }
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
      alert("Erro ao registrar. Tente novamente.");
    }
  });
});
