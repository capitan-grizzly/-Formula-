// js/views/dashboard.js
import { renderCard } from '../components/card.js';

export function renderDashboard() {
  return `
    <!-- Hero section -->
    <section class="container hero">
      <div class="hero-content">
        <span class="label">Para Administradores, Contadores, Novatos, Ingenieros. Para todos.</span>
        <h1>Domina Excel <br> <span class="highlight">como un Analista</span></h1>
        <p>Aprende funciones complejas, construye modelos resilientes y optimiza tus hojas de cálculo con
          desafíos interactivos diseñados para el pensamiento riguroso.</p>

        <div class="hero-buttons">
          <a href="#registro" class="btn btn-primary">Empezar a aprender — Gratis</a>
          <a href="#challenges" class="btn btn-outline">Ver desafíos</a>
        </div>
      </div>

      <div class="hero-visual">
        <article class="mockup-window">
          <div class="mockup-header">
            <div class="mockup-dots">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
            <span class="mockup-title">Desafío #42: Limpieza de datos avanzada</span>
          </div>

          <div class="mockup-body">
            <!-- formulas -->
            <div class="formula-bar">
              <span class="fx">fx =</span>
              <span>
                <span class="func">BUSCARX</span><span class="args">(A2, ProductTable[Code], ProductTable[Price])</span>
              </span>
            </div>

            <!-- false grid -->
            <div class="spreadsheet-grid">
              <div class="grid-header">
                <span>A</span>
                <span>B</span>
                <span>C</span>
                <span>D</span>
              </div>
              <div class="grid-row">
                <span class="active-cell">1042</span>
                <span>...</span>
                <span>...</span>
                <span>...</span>
              </div>
            </div>

            <!-- score -->
            <div class="score-badge">
              <div class="score-left">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Puntuación de eficiencia:</span>
              </div>
              <span class="score-right">96/100</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Features section -->
    <section class="features-section">
      <div class="container">
        <header class="section-header">
          <h2>Todo lo que necesitas para pasar de principiante a experto</h2>
        </header>
        <div class="features-grid">
            ${renderCard(
    `<svg xmlns="http://www.w3.org/2000/svg" 
                    width="28" height="28" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor"   stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                </svg>`,
    "Lecciones estructuradas",
    "Plan de estudios progresivo diseñado para construir modelos mentales, no solo memorizar sintaxis. Desde referencias básicas hasta manipulación de arreglos complejos."
  )}
          ${renderCard(
    `<svg xmlns="http://www.w3.org/2000/svg" 
                width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>`,
    "Desafíos reales",
    "Aplica tus habilidades a conjuntos de datos del mundo real. Limpia datos, construye tableros y automatiza flujos de trabajo en un entorno interactivo."
  )}
          ${renderCard(
    `<svg xmlns="http://www.w3.org/2000/svg" 
                width="28" height="28" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <path d="M12 20v-6M6 20V10M18 20V4"></path>
            </svg>`,
    "Métricas de rendimiento",
    "Obtén una calificación basada en la elegancia de la fórmula, la velocidad de cálculo y la resistencia estructural. Escribe fórmulas que escalen, no solo que funcionen."
  )}
        </div>
      </div>
    </section>
  `;
}
