import { isUsuarioActivo } from "../js/api/apiEjercicios.js";

document.getElementById("button-gestion-ejercicios")?.addEventListener("click", () => {
    window.location.href = "/GesEjercicios";
});
document.addEventListener('DOMContentLoaded', () => {
    isUsuarioActivo();
    if (sessionStorage.getItem("usuario")) {
        console.log("Usuario autenticado.");
    } else {
        alert("No estás autenticado. Redirigiendo a la página principal...");
        window.location.href = "/";
    }
});