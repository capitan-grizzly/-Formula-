// js/views/challenges.js
export function renderChallenges() {
    // Se ejecuta de forma asíncrona para esperar a que el HTML devuelto ya esté insertado en el DOM
    setTimeout(async () => {
        const tbody = document.getElementById('challenges-tbody');
        if (!tbody) return;

        // Estado de carga (colspan="7" porque hay 7 columnas en el thead)
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                    Cargando desafíos...
                </td>
            </tr>
        `;

        try {
            const response = await fetch('http://localhost:3000/api/challenges');

            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status}`);
            }

            const challenges = await response.json();

            tbody.innerHTML = '';

            // Estado vacío
            if (challenges.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                            No hay desafíos disponibles en este momento.
                        </td>
                    </tr>
                `;
                return;
            }

            // Pintar filas dinámicamente
            challenges.forEach(challenge => {
                const tr = document.createElement('tr');
                const efficiency = challenge.efficiencyReq !== null ? challenge.efficiencyReq : '-';

                tr.innerHTML = `
                    <td class="col-num">${challenge.challengeNumber}</td>
                    <td>${challenge.title}</td>
                    <td>${challenge.category}</td>
                    <td>${challenge.difficulty}</td>
                    <td style="text-align: center;" class="col-num">${efficiency}</td>
                    <td style="text-align: center;">-</td>
                    <td style="text-align: center;">${challenge.status}</td>
                `;

                tbody.appendChild(tr);
            });

        } catch (error) {
            console.error('Error al cargar los desafíos:', error);

            // Estado de error
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 2rem; color: #ff5f56;">
                        Error de conexión. No se pudieron cargar los desafíos.
                    </td>
                </tr>
            `;
        }
    }, 0);

    return `
    <div class="dashboard-layout">
        <aside class="sidebar">
            <div class="sidebar-header">
                <a href="/" class="logo">
                    <span class="logo-eq">=</span>Formula<span class="logo-paren">()</span>
                </a>
            </div>
            
            <nav class="nav-menu">
                <a href="#challenges" class="nav-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
                    Plan de estudios
                </a>
                <a href="#" class="nav-item active">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                    Todos los desafíos
                </a>
                <a href="#challenges" class="nav-item">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    Mi progreso
                </a>
            </nav>

            <div class="sidebar-footer">
                <nav class="nav-menu">
                    <a href="#challenges" class="nav-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        Ajustes
                    </a>
                    <a href="#challenges" class="nav-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        Documentación
                    </a>
                    <a href="#challenges" class="nav-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        Soporte
                    </a>
                </nav>
            </div>
        </aside>

        <main class="main-content">
            
            <header class="page-header">
                <h1>Catálogo de desafíos</h1>
                <p>Pon a prueba tu lógica construyendo fórmulas resilientes.</p>
            </header>

            <section class="stats-grid">
                <article class="stat-card">
                    <span class="stat-label">Resueltos</span>
                    <span class="stat-value highlight">0</span>
                </article>
                <article class="stat-card">
                    <span class="stat-label">Intentados</span>
                    <span class="stat-value">0</span>
                </article>
                <article class="stat-card">
                    <span class="stat-label">Restantes</span>
                    <span class="stat-value">-</span>
                </article>
            </section>

            <div class="controls-bar">
                <input type="text" class="search-input" placeholder="Buscar desafío por título o función...">
                
                <div class="filters-group">
                    <select class="filter-select">
                        <option value="" disabled selected>Dificultad</option>
                        <option value="facil">Fácil</option>
                        <option value="medio">Medio</option>
                        <option value="dificil">Difícil</option>
                    </select>
                    
                    <select class="filter-select">
                        <option value="" disabled selected>Categoría</option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                    
                    <select class="filter-select">
                        <option value="" disabled selected>Estado</option>
                        <option value="completado">Completado</option>
                        <option value="intentado">Intentado</option>
                        <option value="pendiente">Pendiente</option>
                    </select>
                </div>
            </div>

            <div class="content-grid">
                
                <section class="table-container">
                    <table class="challenges-table">
                        <thead>
                            <tr>
                                <th>Número</th>
                                <th>Título</th>
                                <th>Categoría</th>
                                <th>Dificultad</th>
                                <th style="text-align: center;">Ef. Req.</th>
                                <th style="text-align: center;">Completado</th>
                                <th style="text-align: center;">Estado</th>
                            </tr>
                        </thead>
                        <tbody id="challenges-tbody"></tbody>
                    </table>
                </section>

                <aside class="efficiency-block">
                    <div class="icon-wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    <h3>Desafíos de eficiencia</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">Métricas avanzadas de rendimiento de fórmulas e historial de intentos de optimización.</p>
                    <span class="badge-soon">Coming soon</span>
                </aside>

            </div>

        </main>
    </div>
  `;
}