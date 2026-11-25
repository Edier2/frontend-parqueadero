// Funciones compartidas por las páginas que requieren sesión.
// Cada página define antes window.API_URL con la dirección del backend.

function tokenSesion() {
    return localStorage.getItem('token');
}

function usuarioSesion() {
    try { return JSON.parse(localStorage.getItem('usuario') || 'null'); } catch { return null; }
}

function exigirSesion() {
    if (!tokenSesion()) window.location.href = '/';
}

function cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/';
}

// Petición a la API con el token. Lanza un Error con el mensaje del backend si falla.
async function api(metodo, ruta, cuerpo) {
    const opciones = { method: metodo, headers: { Authorization: 'Bearer ' + tokenSesion() } };
    if (cuerpo !== undefined) {
        opciones.headers['Content-Type'] = 'application/json';
        opciones.body = JSON.stringify(cuerpo);
    }
    let res;
    try {
        res = await fetch(window.API_URL + ruta, opciones);
    } catch (e) {
        throw new Error('No hay conexión con el servidor');
    }
    let datos = null;
    try { datos = await res.json(); } catch { /* respuesta sin JSON */ }
    if (res.status === 401) {
        cerrarSesion();
        throw new Error('Tu sesión expiró. Inicia sesión de nuevo.');
    }
    if (!res.ok) throw new Error((datos && datos.error) || 'Error ' + res.status);
    return datos;
}

// Escapa texto antes de insertarlo como HTML (evita XSS)
function esc(texto) {
    return String(texto ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function pesos(valor) {
    return '$' + Number(valor || 0).toLocaleString('es-CO', { maximumFractionDigits: 0 });
}

function fechaHora(valor) {
    if (!valor) return '—';
    return new Date(valor).toLocaleString('es-CO', {
        timeZone: 'America/Bogota', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
    });
}

function duracion(minutos) {
    if (minutos == null) return '—';
    const h = Math.floor(minutos / 60), m = minutos % 60;
    return h ? `${h} h ${m} min` : `${m} min`;
}

// Menú superior: el enlace de Administración solo aparece para el rol admin
function pintarMenu(paginaActual) {
    const u = usuarioSesion() || {};
    const enlaces = [['/registros', '🕒 Ingresos y salidas'], ['/vehiculos', '🚗 Vehículos']];
    if (u.rol === 'admin') enlaces.push(['/admin', '🛡️ Administración']);

    document.getElementById('menu').innerHTML = `
        <div class="menu-enlaces">
            ${enlaces.map(([href, texto]) => `<a href="${href}" class="${href === paginaActual ? 'activo' : ''}">${texto}</a>`).join('')}
        </div>
        <div class="menu-usuario">
            <span class="chip">${esc(u.nombre || u.usuario || 'Sesión activa')} · ${u.rol === 'admin' ? 'Administrador' : 'Usuario'}</span>
            <button class="btn-sm btn-secondary" onclick="cerrarSesion()">Cerrar sesión</button>
        </div>`;
}

// Mensaje dentro de la página (éxito o error)
function aviso(id, texto, tipo = 'error') {
    const el = document.getElementById(id);
    el.className = 'alert alert-' + tipo;
    el.textContent = texto;
    el.style.display = texto ? 'block' : 'none';
}

// Modo oscuro, compartido con las demás páginas
function toggleTheme() {
    const oscuro = document.documentElement.getAttribute('data-theme') === 'dark';
    const siguiente = oscuro ? '' : 'dark';
    document.documentElement.setAttribute('data-theme', siguiente);
    localStorage.setItem('theme', siguiente);
    const etiqueta = document.getElementById('theme-label');
    if (etiqueta) etiqueta.textContent = siguiente === 'dark' ? 'Light' : 'Dark';
}

(function aplicarTemaGuardado() {
    const tema = localStorage.getItem('theme');
    if (tema) document.documentElement.setAttribute('data-theme', tema);
    document.addEventListener('DOMContentLoaded', () => {
        const etiqueta = document.getElementById('theme-label');
        if (etiqueta) etiqueta.textContent = tema === 'dark' ? 'Light' : 'Dark';
    });
})();
