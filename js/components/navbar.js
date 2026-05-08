// js/components/navbar.js
export function renderNavbar() {
    return `
    <nav class="nav-links">
      <a href="#curriculum">Aprender</a>
      <a href="#challenges">Desafíos</a>
      <a href="#clasificacion">Tabla de clasificación</a>
      <a href="#docs">Documentación</a>
    </nav>
    <div class="auth-actions">
      <a href="#login" class="btn-text mobile-hide">Iniciar sesión</a>
      <a href="#empezar" class="btn btn-primary">Empezar</a>
    </div>
  `;
}