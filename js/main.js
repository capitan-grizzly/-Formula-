// js/main.js
import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderDashboard } from './views/dashboard.js';
import { renderChallenges } from './views/challenges.js';

function loadNavbar() {
    const header = document.querySelector('.header .container');
    header.innerHTML = `
    <a href="/" class="logo">
      <span class="logo-eq">=</span>Formula<span class="logo-paren">()</span>
    </a>
    ${renderNavbar()}
  `;
}

function loadFooter() {
    const footer = document.querySelector('.footer');
    footer.innerHTML = renderFooter();
}

function router() {
    const main = document.querySelector('main');
    const path = window.location.hash;
    const footer = document.querySelector('.footer');

    switch (path) {
        case '#curriculum':
            // main.innerHTML = renderCurriculum();
            break;
        case '#challenges':
            main.innerHTML = renderChallenges();
            footer.style.display = 'none';
            break;
        default:
            main.innerHTML = renderDashboard();
            footer.style.display = '';
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
