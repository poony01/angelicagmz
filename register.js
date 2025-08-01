document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { user, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert("Erro ao criar conta: " + error.message);
  } else {
    window.location.href = "home.html";
  }
});

// Mostrar/ocultar senha
document.getElementById("togglePassword").addEventListener("click", () => {
  const passwordInput = document.getElementById("password");
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
});
