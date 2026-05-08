// js/components/card.js
export function renderCard(iconSVG, title, description) {
    return `
    <article class="feature-card">
      <div class="feature-icon">
        ${iconSVG}
      </div>
      <h3>${title}</h3>
      <p>${description}</p>
    </article>
  `;
}