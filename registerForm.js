// registerForm.js
document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const user = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    password: form.password.value,
  };

  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });

    const data = await res.json();
    if (res.ok) {
      alert('Conta criada com sucesso!');
      window.location.href = './index.html';
    } else {
      alert(data.message || 'Erro ao registrar.');
    }
  } catch (err) {
    console.error(err);
    alert('Erro ao conectar com o servidor.');
  }
});
