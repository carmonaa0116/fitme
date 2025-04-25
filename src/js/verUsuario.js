import { getUnUsuario, getRutinasUser } from "./api/apiEjercicios";

document.addEventListener('DOMContentLoaded', async () => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    console.log("ID:", id);

    // Obtiene los datos del usuario
    const usuario = await getUnUsuario(id);

    // Si los datos existen, se actualiza el contenido
    if (usuario && usuario.usuario) {
        const data = usuario.usuario;

        // Actualiza los elementos del perfil
        document.getElementById('perfil_usuario').textContent = data.nombre_usuario || 'No disponible';
        document.getElementById('perfil_nombre').textContent = data.nombre || 'No disponible';
        document.getElementById('perfil_correo').textContent = data.email || 'No disponible';
        document.getElementById('perfil_sexo').textContent = data.sexo || 'No disponible';
        document.getElementById('perfil_fechaNac').textContent = data.fecha_nacimiento || 'No disponible';
        document.getElementById('perfil_experiencia').textContent = data.experiencia || 'No disponible';
        document.getElementById('perfil_altura').textContent = data.altura || 'No disponible';
        document.getElementById('perfil_peso').textContent = data.peso || 'No disponible';

        // Si la foto de perfil está disponible, actualizarla
        if (data.foto_perfil) {
            // Seguir por aqui -> document.getElementById('profile-img').src = ``data.foto_perfil;
        }
    }

    cargarRutinasUsr()


    async function cargarRutinasUsr() {
        const rutinas = await getRutinasUser(id);
        console.log(rutinas)
    }

});


