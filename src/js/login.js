import { login } from "./api/apiEjercicios.js";

document.getElementById("form-login").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evitar que se recargue la página

    const nombreUsuario = document.getElementById("nombre_usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    try {
        // Llamar al método de login con los datos del formulario
        const usuario = await login(nombreUsuario, contrasena);
        if (usuario) {
            // Guardar los datos del usuario en sessionStorage
            sessionStorage.setItem("usuario", JSON.stringify(usuario));

            // Imprimir los datos del usuario en la consola
            console.log("Datos de sesión del usuario:", usuario);

            // Redirigir al usuario (por ejemplo, a la página principal)
            window.location.href = '/Home'; // Cambiar a la ruta adecuada después del login
        }
    } catch (error) {
        // Mostrar el error en el dialog
        const dialog = document.getElementById("login-error-dialog");
        const message = document.getElementById("login-error-message");
        message.textContent = error.message || "Ha ocurrido un error al iniciar sesión.";
        dialog.showModal();

        // Cerrar el dialog al hacer click en el botón
        document.getElementById("close-error-dialog").onclick = () => {
            dialog.close();
        };
    }
});
