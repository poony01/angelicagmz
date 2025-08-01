// register.js
import { supabase } from './supabaseClient.js';

document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert('Preencha todos os campos.');
    return;
  }

  // Verifica se o e-mail já existe
  const { data: existingUser, error: selectError } = await supabase
    .from('users')
    .select('email')
    .eq('email', email)
    .single();

  if (existingUser) {
    alert('Este e-mail já está em uso.');
    return;
  }

  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password }]);

  if (error) {
    console.error(error);
    alert('Erro ao registrar usuário.');
  } else {
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html';
  }
});
