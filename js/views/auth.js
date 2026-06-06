// js/views/auth.js

export function renderLogin() {
    return `
        <div class="auth-layout" style="position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; background-color: var(--bg-base); z-index: 50;">
            <div class="auth-card" style="background-color: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 2.5rem; width: 100%; max-width: 400px; display: flex; flex-direction: column; gap: 2rem;">
                
                <div class="auth-header" style="text-align: center;">
                    <a href="/" class="logo" style="text-decoration: none; display: inline-block; margin-bottom: 1.5rem;">
                        <span class="logo-eq" style="color: var(--accent-primary); font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700;">=</span><span style="color: var(--text-primary); font-size: 1.5rem; font-weight: 700;">Formula</span><span class="logo-paren" style="color: var(--accent-primary); font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700;">()</span>
                    </a>
                    <h2 style="color: var(--text-primary); margin: 0 0 0.5rem 0; font-size: 1.5rem;">Iniciar Sesión</h2>
                    <p style="color: var(--text-secondary); font-size: 0.95rem; margin: 0;">Bienvenido de vuelta a tu plan de estudios</p>
                </div>

                <div id="form-login" style="display: flex; flex-direction: column; gap: 1.25rem;">
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label for="email" style="color: var(--text-secondary); font-size: 0.85rem;">Email</label>
                        <input type="email" id="email" style="background-color: var(--bg-base); border: 1px solid var(--border-color); color: var(--text-primary); padding: 0.75rem 1rem; border-radius: 8px; outline: none; font-family: var(--font-mono);" placeholder="tu@email.com">
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label for="password" style="color: var(--text-secondary); font-size: 0.85rem;">Contraseña</label>
                        <input type="password" id="password" style="background-color: var(--bg-base); border: 1px solid var(--border-color); color: var(--text-primary); padding: 0.75rem 1rem; border-radius: 8px; outline: none; font-family: var(--font-mono);" placeholder="••••••••">
                    </div>
                    
                    <button id="btn-login" style="background-color: var(--accent-primary); color: var(--bg-base); border: none; padding: 0.85rem; border-radius: 8px; font-weight: 600; cursor: pointer; margin-top: 0.5rem; font-size: 1rem; transition: opacity 0.2s;">
                        Entrar
                    </button>
                </div>

                <div style="text-align: center; margin-top: 0.5rem;">
                    <a href="#register" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem;">
                        ¿No tienes cuenta? <span style="color: var(--accent-primary); font-weight: 600;">Regístrate</span>
                    </a>
                </div>
            </div>
        </div>
    `;
}

export function renderRegister() {
    return `
        <div class="auth-layout" style="position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; background-color: var(--bg-base); z-index: 50;">
            <div class="auth-card" style="background-color: var(--bg-surface); border: 1px solid var(--border-color); border-radius: 12px; padding: 2.5rem; width: 100%; max-width: 400px; display: flex; flex-direction: column; gap: 2rem;">
                
                <div class="auth-header" style="text-align: center;">
                    <a href="/" class="logo" style="text-decoration: none; display: inline-block; margin-bottom: 1.5rem;">
                        <span class="logo-eq" style="color: var(--accent-primary); font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700;">=</span><span style="color: var(--text-primary); font-size: 1.5rem; font-weight: 700;">Formula</span><span class="logo-paren" style="color: var(--accent-primary); font-family: var(--font-mono); font-size: 1.5rem; font-weight: 700;">()</span>
                    </a>
                    <h2 style="color: var(--text-primary); margin: 0 0 0.5rem 0; font-size: 1.5rem;">Crear Cuenta</h2>
                    <p style="color: var(--text-secondary); font-size: 0.95rem; margin: 0;">Únete y domina las fórmulas</p>
                </div>

                <div id="form-register" style="display: flex; flex-direction: column; gap: 1.25rem;">
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label for="name" style="color: var(--text-secondary); font-size: 0.85rem;">Nombre</label>
                        <input type="text" id="name" style="background-color: var(--bg-base); border: 1px solid var(--border-color); color: var(--text-primary); padding: 0.75rem 1rem; border-radius: 8px; outline: none; font-family: var(--font-mono);" placeholder="Tu nombre">
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label for="email" style="color: var(--text-secondary); font-size: 0.85rem;">Email</label>
                        <input type="email" id="email" style="background-color: var(--bg-base); border: 1px solid var(--border-color); color: var(--text-primary); padding: 0.75rem 1rem; border-radius: 8px; outline: none; font-family: var(--font-mono);" placeholder="tu@email.com">
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <label for="password" style="color: var(--text-secondary); font-size: 0.85rem;">Contraseña</label>
                        <input type="password" id="password" style="background-color: var(--bg-base); border: 1px solid var(--border-color); color: var(--text-primary); padding: 0.75rem 1rem; border-radius: 8px; outline: none; font-family: var(--font-mono);" placeholder="••••••••">
                    </div>
                    
                    <button id="btn-register" style="background-color: var(--accent-primary); color: var(--bg-base); border: none; padding: 0.85rem; border-radius: 8px; font-weight: 600; cursor: pointer; margin-top: 0.5rem; font-size: 1rem; transition: opacity 0.2s;">
                        Registrarse
                    </button>
                </div>

                <div style="text-align: center; margin-top: 0.5rem;">
                    <a href="#login" style="color: var(--text-secondary); text-decoration: none; font-size: 0.9rem;">
                        ¿Ya tienes cuenta? <span style="color: var(--accent-primary); font-weight: 600;">Inicia sesión</span>
                    </a>
                </div>
            </div>
        </div>
    `;
}