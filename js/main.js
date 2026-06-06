// js/main.js

import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderDashboard } from './views/dashboard.js';
import { renderChallenges } from './views/challenges.js';
import { renderLogin, renderRegister } from './views/auth.js';

function loadNavbar() {
    const header = document.querySelector('.header .container');
    if (header) {
        header.innerHTML = `
        <a href="/" class="logo">
          <span class="logo-eq">=</span>Formula<span class="logo-paren">()</span>
        </a>
        ${renderNavbar()}
      `;
    }
}

function loadFooter() {
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.innerHTML = renderFooter();
    }
}

function router() {
    const main = document.querySelector('main');
    const path = window.location.hash;
    const footer = document.querySelector('.footer');
    const header = document.querySelector('.header');

    // Restaurar el header por defecto para todas las vistas
    if (header) {
        header.style.display = '';
    }

    switch (path) {
        case '#login':
            // Ocultar header (y footer por ser pantalla completa)
            if (header) header.style.display = 'none';
            if (footer) footer.style.display = 'none';
            main.innerHTML = renderLogin();

            setTimeout(() => {
                const btnLogin = document.getElementById('btn-login');
                if (btnLogin) {
                    btnLogin.addEventListener('click', async () => {
                        const email = document.getElementById('email').value;
                        const password = document.getElementById('password').value;
                        const formContainer = document.getElementById('form-login');

                        const existingError = document.getElementById('auth-error');
                        if (existingError) existingError.remove();

                        try {
                            const response = await fetch('http://localhost:3000/api/auth/login', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email, password })
                            });

                            const data = await response.json();

                            if (!response.ok) {
                                throw new Error(data.error || 'Error al iniciar sesión');
                            }

                            localStorage.setItem('formula_token', data.token);
                            window.location.hash = '#challenges';

                        } catch (error) {
                            const errorMsg = document.createElement('p');
                            errorMsg.id = 'auth-error';
                            errorMsg.style.color = '#ff5f56';
                            errorMsg.style.fontSize = '0.9rem';
                            errorMsg.style.marginTop = '0.5rem';
                            errorMsg.style.textAlign = 'center';
                            errorMsg.textContent = error.message;
                            formContainer.appendChild(errorMsg);
                        }
                    });
                }
            }, 0);
            break;

        case '#register':
            if (header) header.style.display = 'none';
            if (footer) footer.style.display = 'none';
            main.innerHTML = renderRegister();

            setTimeout(() => {
                const btnRegister = document.getElementById('btn-register');
                if (btnRegister) {
                    btnRegister.addEventListener('click', async () => {
                        const name = document.getElementById('name').value;
                        const email = document.getElementById('email').value;
                        const password = document.getElementById('password').value;
                        const formContainer = document.getElementById('form-register');

                        const existingError = document.getElementById('auth-error');
                        if (existingError) existingError.remove();

                        try {
                            const response = await fetch('http://localhost:3000/api/auth/register', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ name, email, password })
                            });

                            const data = await response.json();

                            if (!response.ok) {
                                throw new Error(data.error || 'Error al registrarse');
                            }

                            window.location.hash = '#login';

                        } catch (error) {
                            const errorMsg = document.createElement('p');
                            errorMsg.id = 'auth-error';
                            errorMsg.style.color = '#ff5f56';
                            errorMsg.style.fontSize = '0.9rem';
                            errorMsg.style.marginTop = '0.5rem';
                            errorMsg.style.textAlign = 'center';
                            errorMsg.textContent = error.message;
                            formContainer.appendChild(errorMsg);
                        }
                    });
                }
            }, 0);
            break;

        case '#curriculum':
            // main.innerHTML = renderCurriculum();
            break;

        case '#challenges':
            main.innerHTML = renderChallenges();
            if (footer) footer.style.display = 'none';
            break;

        default:
            main.innerHTML = renderDashboard();
            if (footer) footer.style.display = '';
            break;
    }
}

// Inicialización
window.addEventListener('load', () => {
    loadNavbar();
    loadFooter();
    router();
});

window.addEventListener('hashchange', router);