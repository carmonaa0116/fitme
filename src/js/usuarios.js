import { getResultadosBusquedaUsr, obtenerAmigos } from './api/apiEjercicios.js';

document.addEventListener('DOMContentLoaded', async () => {
    await inicializarAmigos();
    inicializarBusquedaUsuarios();

});

async function inicializarAmigos() {
    const amigos = await obtenerAmigos();
    const userList = document.querySelector('.user-list');
    console.log(amigos);

    amigos.forEach((amigo) => {
        console.log(amigo);
        const div = document.createElement('div');
        div.classList.add('user-item');
        div.innerHTML = `
            <a href="/VerUsuario?id=${amigo.id}" class="user-link" style="text-decoration: none; color: inherit;">
                <div class="user-info">
                    <img 
                        src="data:image/png;base64,${amigo.foto_perfil}" 
                        alt="${amigo.nombre}" 
                        class="user-avatar" 
                        onerror="this.onerror=null;this.src='/src/assets/user-icon.png';"
                    />
                    <p><strong>${amigo.nombre_usuario}<strong></p>
                    <p>${amigo.nombre}</p>
                    <p>${amigo.experiencia}</p>
                </div>
            </a>
        `;

        div.addEventListener('click', () => {
            redirigirUsuarioSeleccionado(amigo);
        });

        userList.appendChild(div);
    });
}

function inicializarBusquedaUsuarios() {
    const searchInput = document.getElementById('searchInput');
    console.log('searchInput:', searchInput);
    const datosSesion = JSON.parse(sessionStorage.getItem('usuario')) || {};

    if (searchInput) {
        searchInput.addEventListener('input', async (e) => {
            manejarBusquedaUsuarios(e, datosSesion);
        });
    } else {
        console.error('Element with ID "searchInput" not found.');
    }
}

async function manejarBusquedaUsuarios(evento, datosSesion) {
    const busquedaActual = evento.target.value.toLowerCase();
    const userList = document.getElementById('user-list');

    const resultados = await getResultadosBusquedaUsr(busquedaActual);
    actualizarListaUsuarios(resultados, busquedaActual, datosSesion, userList);
}

function actualizarListaUsuarios(resultados, busquedaActual, datosSesion, userList) {
    userList.innerHTML = ''; // Limpiar resultados previos

    if (resultados.length === 0) {
        userList.innerHTML = `<p>No se encontraron resultados para "${busquedaActual}"</p>`;
    } else {
        resultados.forEach((usuario) => {
            if (datosSesion.nombre_usuario && usuario.nombre_usuario === datosSesion.nombre_usuario) return; // Ignorar el usuario actual
            const div = crearElementoUsuario(usuario);
            userList.appendChild(div);
        });
    }
}

function crearElementoUsuario(usuario) {
    const div = document.createElement('div');
    div.classList.add('user-item');
    div.innerHTML = `
        <a href="/VerUsuario?id=${usuario.id}" class="user-link" style="text-decoration: none; color: inherit;">
            <div class="user-info">
                <img 
                    src="data:image/png;base64,${usuario.foto_perfil}" 
                    alt="${usuario.nombre}" 
                    class="user-avatar" 
                    onerror="this.onerror=null;this.src='/src/assets/user-icon.png';"
                />
                <p><strong>${usuario.nombre_usuario}<strong></p>
                <p>${usuario.nombre}</p>
                <p>${usuario.experiencia}</p>
            </div>
        </a>
    `;

    div.addEventListener('click', () => {
        redirigirUsuarioSeleccionado(usuario);
    });

    return div;
}

function redirigirUsuarioSeleccionado(usuario) {
    const usuarioSeleccionado = {
        nombre_usuario: usuario.nombre_usuario,
        nombre: usuario.nombre,
        experiencia: usuario.experiencia,
        foto_perfil: usuario.foto_perfil,
        id_usuario: usuario.id,
    };

    window.location.href = `/VerUsuario?id=${usuarioSeleccionado.id_usuario}`;
}
