// login.js
import { supabase } from './supabaseClient.js';

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    alert('Preencha todos os campos.');
    return;
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (error || !user) {
    alert('E-mail ou senha incorretos.');
  } else {
    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = 'home.html';
  }
});
