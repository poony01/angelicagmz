// script.js
document.getElementById('toggle-form').addEventListener('click', () => {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');
  const formTitle = document.getElementById('form-title');
  const toggle = document.getElementById('toggle-form');

  if (registerForm.style.display === 'none') {
    registerForm.style.display = 'block';
    loginForm.style.display = 'none';
    formTitle.textContent = 'Criar Conta';
    toggle.innerHTML = 'Já tem conta? <a href="#">Entrar</a>';
  } else {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    formTitle.textContent = 'Entrar';
    toggle.innerHTML = 'Não tem conta? <a href="#">Registrar</a>';
  }
});
