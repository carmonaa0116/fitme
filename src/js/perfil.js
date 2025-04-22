document.addEventListener('DOMContentLoaded', () => {
    const usuarioJSON = sessionStorage.getItem('usuario');
    console.log(usuarioJSON)
    if (!usuarioJSON) {
        console.warn("No se encontró el usuario en la sesión.");
        return;
    }

    const usuario = JSON.parse(usuarioJSON);

    // Cambiar el texto de bienvenida
    const h1 = document.querySelector(".profile-header h1");
    if (h1) h1.textContent = `Bienvenido, ${usuario.nombre.split(" ")[0]}`;

    // Actualizar los datos del perfil
    const detalles = document.querySelector(".profile-details");
    if (detalles) {
        detalles.innerHTML = `
            <h2>Detalles del perfil</h2>
            <p><strong>Nombre:</strong> ${usuario.nombre}</p>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Fecha de nacimiento:</strong> ${formatearFecha(usuario.fecha_nacimiento)}</p>
            <p><strong>Sexo:</strong> ${usuario.sexo || 'No especificado'}</p>
            <p><strong>Experiencia:</strong> ${usuario.experiencia}</p>
            <p><strong>Altura:</strong> ${usuario.altura} cm</p>
            <p><strong>Peso:</strong> ${usuario.peso} kg</p>
            <button id="editProfileBtn">Editar Perfil</button>
        `;
    }
});

// Función para formatear fecha de YYYY-MM-DD a DD/MM/YYYY
function formatearFecha(fecha) {
    const [year, month, day] = fecha.split("-");
    return `${day}/${month}/${year}`;
}
