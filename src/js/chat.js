import { obtenerMensajes, enviarMensaje } from './api/apiEjercicios.js';

document.addEventListener('DOMContentLoaded', async () => {
    const datosSesion = JSON.parse(sessionStorage.getItem('usuario')) || {};
    const url = new URL(window.location.href);
    const idAmigo = url.searchParams.get("id");

    if (!idAmigo || !datosSesion.id) {
        console.error("Faltan datos necesarios para cargar el chat.");
        return;
    }

    // Función para cargar y mostrar mensajes
    async function cargarMensajes() {
        try {
            const mensajes = await obtenerMensajes(datosSesion.id, idAmigo);
            mostrarMensajes(mensajes, datosSesion.id);
        } catch (error) {
            console.error("Error al obtener mensajes:", error);
        }
    }

    // Primera carga
    await cargarMensajes();

    // Configurar el intervalo para recargar cada 3 segundos (3000 ms)
    const intervalo = setInterval(cargarMensajes, 3000);

    const formulario = document.querySelector('.chat-input');
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = formulario.querySelector('input');
        const texto = input.value.trim();

        if (!texto) return;

        const exito = await enviarMensaje(datosSesion.id, idAmigo, texto);

        if (exito) {
            input.value = "";
            // Tras enviar el mensaje, se recargan los mensajes inmediatamente
            await cargarMensajes();
        } else {
            console.error("No se pudo enviar el mensaje.");
        }
    });

    // Opcional: si en algún momento quieres limpiar el intervalo, podrías hacerlo con:
    // clearInterval(intervalo);
});

function mostrarMensajes(mensajes, miId) {
    const contenedor = document.querySelector(".mensajes");
    contenedor.innerHTML = "";

    mensajes.forEach(msg => {
        const div = document.createElement("div");
        // Asigna clase según si el mensaje es mío o de otro
        if (msg.tipo_emisor === 'mio') {
            div.className = "mensaje mio";
        } else {
            div.className = "mensaje otro";
        }

        div.innerHTML = `
            <p>${msg.contenido}</p>
            <span class="hora">${msg.enviado_en}</span>
        `;
        contenedor.appendChild(div);
    });

    contenedor.scrollTop = contenedor.scrollHeight;
}

