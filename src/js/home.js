import { isUsuarioActivo, getDatosSesion, getTopRutinas } from "../js/api/apiEjercicios.js";
import 'driver.js/dist/driver.css';

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Página de inicio cargada.");
    const datosSesion = getDatosSesion();
    console.log(datosSesion);

    isUsuarioActivo();

    if (!sessionStorage.getItem("usuario")) {
        alert("No estás autenticado. Redirigiendo a la página principal...");
        window.location.href = "/";
        return;
    }

    console.log("Usuario autenticado.");

    // Mostrar bienvenida
    const divBienvenida = document.querySelector(".bienvenida");
    const datosUsr = sessionStorage.getItem("usuario");
    let firstName = "Usuario";
    if (datosUsr) {
        firstName = datosSesion.nombre ? datosSesion.nombre.split(" ")[0] : "Usuario";
    }
    if (divBienvenida) {
        divBienvenida.innerHTML = `<h1 style="text-align: center; line-height: 1;">¡Hola, ${firstName}! 👋</h1>`;
    }

    // Botón para ir al generador de rutinas
    const buttonGoToGenerator = document.getElementById("button-generator");
    if (buttonGoToGenerator) {
        buttonGoToGenerator.addEventListener("click", () => {
            window.location.href = "/Rutinas";
        });
    }

    const topRutinas = await getTopRutinas();

    const divRutinasComunidad = document.getElementById("div-rutinas-comunidad");
    console.log(divRutinasComunidad);

    if (divRutinasComunidad && topRutinas && topRutinas.length > 0) {


        topRutinas.forEach((item) => {
            const rutina = item.rutina;
            const usuario = item.usuario;

            const divRutina = document.createElement("div");
            divRutina.classList.add("rutina");
            divRutina.style.border = "1px solid #ccc";
            divRutina.style.borderRadius = "10px";
            divRutina.style.padding = "10px";
            divRutina.style.margin = "10px 0";

            const h2 = document.createElement("h2");
            h2.textContent = `${rutina.nombre} 💪`;

            const pAutor = document.createElement("p");
            pAutor.textContent = `Creada por: ${usuario.nombre || usuario.nombre_usuario}`;

            const pVisitas = document.createElement("p");
            pVisitas.textContent = `Visitas: ${rutina.visitas}`;

            divRutina.appendChild(h2);
            divRutina.appendChild(pAutor);
            divRutina.appendChild(pVisitas);

            // Hover dinámico
            divRutina.addEventListener("mouseover", () => {
                divRutina.style.backgroundColor = "var(--red)";
                divRutina.style.cursor = "pointer";
                divRutina.style.color = "white";
                divRutina.style.transition = "background-color 0.3s ease, color 0.3s ease";
            });

            divRutina.addEventListener("mouseout", () => {
                divRutina.style.backgroundColor = "";
                divRutina.style.color = "";
            });

            // Redirección a la rutina
            divRutina.addEventListener("click", () => {
                window.location.href = `/VerRutinaUsr?id=${rutina.id}`;
            });

            divRutinasComunidad.appendChild(divRutina);
        });
    } else if (divRutinasComunidad) {
        divRutinasComunidad.innerHTML = "<p>No hay rutinas destacadas aún. ¡Sé el primero en compartir una! 🚀</p>";
    }
});
