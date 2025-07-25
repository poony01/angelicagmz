// loginForm.js
document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const user = {
    email: form.email.value,
    password: form.password.value,
  };

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });

    const data = await res.json();
    if (res.ok) {
      alert('Login realizado com sucesso!');
      window.location.href = './dashboard.html'; // redireciona para o painel
    } else {
      alert(data.message || 'E-mail ou senha inválidos.');
    }
  } catch (err) {
    console.error(err);
    alert('Erro ao conectar com o servidor.');
  }
});
