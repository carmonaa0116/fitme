import { getFotoPerfilBase64, cargarNotificaciones, cambiarEstadoSolicitud } from "./api/apiEjercicios.js";

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const notificationsPanel = document.getElementById("notifications-panel");
const notificationsBtn = document.getElementById("notifications-btn");
notificationsBtn.addEventListener("click", () => {

    notificationsPanel.classList.toggle("hidden");
});

// Lógica para el menú lateral
if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function () {
        navigation.classList.toggle("open");
    });

    document.addEventListener("click", function (event) {
        if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) {
            navigation.classList.remove("open");
        }
    });
}


document.addEventListener('DOMContentLoaded', async () => {
    const datosSesionJSON = sessionStorage.getItem('usuario');
    const datosSesion = JSON.parse(datosSesionJSON);

    const imgPerfilUsr = document.getElementById('user-icon');
    try {
        const fotoPerfilBase64 = await getFotoPerfilBase64(datosSesion.id);
        imgPerfilUsr.src = fotoPerfilBase64
            ? `data:image/png;base64,${fotoPerfilBase64}`
            : '/src/assets/user-icon.png';
    } catch (error) {
        console.error("Error al obtener la foto de perfil:", error);
        imgPerfilUsr.src = '/src/assets/user-icon.png';
    }

    const notificaciones = await cargarNotificaciones(datosSesion.id);
    console.log(notificaciones);

    const notificationsList = document.querySelector(".notifications-list");
    console.log(notificaciones.length);
    notificaciones.forEach((notificacion) => {
        console.log(notificacion);
        const li = document.createElement("li");
        li.classList.add("notification-item");
        // Crear el span principal
        const span = document.createElement("span");

        // Crear el strong y el enlace
        const strong = document.createElement("strong");
        const link = document.createElement("a");
        link.href = `/VerUsuario?id=${notificacion.id_remitente}`;
        link.textContent = "Juan Pérez"; // Puedes reemplazar por notificacion.nombre_remitente si tienes el nombre

        strong.appendChild(link);
        span.appendChild(strong);

        // Texto después del nombre
        span.appendChild(document.createTextNode(" te ha enviado una solicitud"));

        // Crear el contenedor de acciones
        const actionsDiv = document.createElement("div");
        actionsDiv.className = "notification-actions";

        // Botón aceptar
        const acceptBtn = document.createElement("button");
        acceptBtn.className = "accept-btn";
        acceptBtn.setAttribute("aria-label", "Aceptar");
        acceptBtn.textContent = "✔️";
        acceptBtn.addEventListener("click", async () => {
            await cambiarEstadoSolicitud(notificacion.solicitud_id, 'Aceptada');
            li.remove(); // Eliminar la notificación de la lista
            const friendRequestDialog = document.getElementById("friendRequestDialog");
            const dialogMessage = document.getElementById("dialogMessage").textContent = `Has aceptado la solicitud de amistad de ${notificacion.nombre_remitente}`;
            friendRequestDialog.showModal();
        });

        // Botón denegar
        const denyBtn = document.createElement("button");
        denyBtn.className = "deny-btn";
        denyBtn.setAttribute("aria-label", "Denegar");
        denyBtn.textContent = "❌";

        // Agregar botones al contenedor de acciones
        actionsDiv.appendChild(acceptBtn);
        actionsDiv.appendChild(denyBtn);

        // Agregar elementos al li
        li.appendChild(span);
        li.appendChild(actionsDiv);

        notificationsList.appendChild(li);
    });
    console
    document.getElementById("notifications-count").textContent = notificaciones.length;
});