import { isUsuarioActivo, getDatosSesion } from "../js/api/apiEjercicios.js";

document.getElementById("button-gestion-ejercicios")?.addEventListener("click", () => {
    window.location.href = "/GesEjercicios";
});
document.addEventListener('DOMContentLoaded', () => {
    console.log("Página de inicio cargada.");
    const datosSesion = getDatosSesion();
    console.log(datosSesion);

    console.log('Hola')
    isUsuarioActivo();
    if (sessionStorage.getItem("usuario")) {
        console.log("Usuario autenticado.");
    } else {
        alert("No estás autenticado. Redirigiendo a la página principal...");
        window.location.href = "/";
        return;
    }

    // Mezcla del script de bienvenida y botón generator
    const divBienvenida = document.querySelector(".bienvenida");
    const buttonGoToGenerator = document.getElementById("button-generator");

    if (buttonGoToGenerator) {
        buttonGoToGenerator.addEventListener("click", () => {
            window.location.href = "/Rutinas";
        });
    }

    const datosUsr = sessionStorage.getItem("usuario");
    let parsedUsr = {};
    let firstName = "Usuario";
    if (datosUsr) {
           
            firstName = datosSesion.nombre ? datosSesion.nombre.split(" ")[0] : "Usuario";

    }

    if (divBienvenida && datosUsr) {
        console.log("Datos del usuario:", datosUsr);
        console.log(firstName);
        const experiencia = parsedUsr.experiencia || "Principiante";
        const altura = parsedUsr.altura ? `${parsedUsr.altura} cm` : "";
        const peso = parsedUsr.peso ? `${parsedUsr.peso} kg` : "";
        divBienvenida.innerHTML = `
            <h1 style="text-align: center; line-height: 1;">¡Hola, ${firstName}! 👋</h1>
            <h2 style="text-align: center; font-size: 1.2rem; font-weight: 400;">
                Nivel: ${experiencia} | Altura: ${altura} | Peso: ${peso}
            </h2>
        `;
    } else if (divBienvenida) {
        divBienvenida.innerHTML = `<h1 style="text-align: center; line-height: 1;">¡Bienvenido/a, Usuario!</h1>`;
    }
});