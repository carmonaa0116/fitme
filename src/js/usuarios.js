import { getResultadosBusquedaUsr } from './api/apiEjercicios.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    let timeoutId;
    const datosSesion = JSON.parse(sessionStorage.getItem('usuario')) || {};
    console.log(datosSesion)
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const busquedaActual = e.target.value.toLowerCase();
            const userList = document.getElementById('user-list');

            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(async () => {
                const resultados = await getResultadosBusquedaUsr(busquedaActual);
                userList.innerHTML = ''; // Limpiar resultados previos

                if (resultados.length === 0) {
                    userList.innerHTML = `<p>No se encontraron resultados para "${busquedaActual}"</p>`;
                } else {
                    resultados.forEach((usuario) => {
                        console.log(datosSesion.nombre_usuario, usuario.nombre_usuario);
                        if (datosSesion.nombre_usuario && usuario.nombre_usuario === datosSesion.nombre_usuario) return; // Ignorar el usuario actual
                        const div = document.createElement('div');
                        div.classList.add('user-item');
                        div.innerHTML = `
                            <div class="user-info">
                                <img 
                                    src="data:image/png;base64,${usuario.foto_perfil}" 
                                    alt="${usuario.nombre}" 
                                    class="user-avatar" 
                                    onerror="this.onerror=null;this.src='/src/assets/user-icon.png';"
                                />
                                <p>${usuario.nombre_usuario}</p>
                                <p>${usuario.nombre}</p>
                                <p>${usuario.experiencia}</p>
                            </div>
                        `;

                        div.addEventListener('click', () => {
                            const usuarioSeleccionado = {
                                nombre_usuario: usuario.nombre_usuario,
                                nombre: usuario.nombre,
                                experiencia: usuario.experiencia,
                                foto_perfil: usuario.foto_perfil,
                                id_usuario: usuario.id,
                            };

                            window.location.href = `/VerUsuario?id=${usuarioSeleccionado.id_usuario}`;
                        });

                        userList.appendChild(div);
                    });
                }
            }, 1000); // Esperar 1 segundo
        });
    } else {
        console.error('Element with ID "searchInput" not found.');
    }
});
