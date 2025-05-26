import { getUnUsuario, getRutinasUser, enviar_solicitud } from "./api/apiEjercicios";

document.addEventListener('DOMContentLoaded', async () => {
    const datosSesion = JSON.parse(sessionStorage.getItem('usuario')) || {};
    console.log(datosSesion);
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
        document.getElementById('username').textContent = data.nombre_usuario || 'No disponible';
        const boton_request = document.getElementById('friend-request-button');
        
        boton_request.addEventListener('click', async () => {
            await enviar_solicitud(datosSesion.id, id);
            const solicitudAmistadDialog = document.getElementById('solicitudAmistadDialog');
            solicitudAmistadDialog.showModal();
            
        });
            

        // Si la foto de perfil está disponible, actualizarla
        if (data.foto_perfil) {
            document.getElementById('profile-img').src = `data:image/png;base64,${data.foto_perfil}`;
        }
    }

   

    await cargarRutinasUsr();

    async function cargarRutinasUsr() {
        const rutinas = await getRutinasUser(id);
        console.log(rutinas);
        const rutinasContainer = document.getElementById('routines-container');
        rutinasContainer.innerHTML = ""; // Limpiar contenido previo

        if (rutinas.mensaje) {
            rutinasContainer.innerHTML = `
                <div class="info-usuario">
                    <h3>${rutinas.mensaje}</h3>
                </div>
            `;
        } else {
            rutinas.forEach((rutina) => {
                crearTarjetaRutina(rutina, rutinasContainer);
            });
        }
    }

    // Función para crear una tarjeta de rutina
    function crearTarjetaRutina(rutina, container) {
        const divRutina = document.createElement("div");
        divRutina.classList.add("rutina");
        divRutina.style.border = "1px solid #ccc";
        divRutina.style.borderRadius = "10px";
        divRutina.style.padding = "10px";
        divRutina.style.margin = "10px 0";

        const h2 = document.createElement("h2");
        h2.textContent = `${rutina.nombre} 💪`;

        const p = document.createElement("p");
        p.textContent = `Días de la semana: ${rutina.dias.join(", ")}`;

        divRutina.appendChild(h2);
        divRutina.appendChild(p);

        // Efecto hover
        divRutina.addEventListener("mouseover", () => {
            divRutina.style.backgroundColor = "var(--red)";
            divRutina.style.cursor = "pointer";
            divRutina.style.color = "white";
            divRutina.style.transition = "background-color 0.3s ease, color 0.3s ease";
        });
        divRutina.addEventListener("mouseout", () => {
            divRutina.style.backgroundColor = "";
        });

        divRutina.addEventListener("click", () => {
            // Redirigir a la página de ejercicios de la rutina
            window.location.href = `/EjerciciosRutina?id=${rutina.id}`;
        });

        container.appendChild(divRutina);
    }
});