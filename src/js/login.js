import { auth } from '/src/firebase.js';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { comprobarUsuarioLogin, getDatosUsuarioUID } from '/src/js/api/apiEjercicios.js';
document.addEventListener('DOMContentLoaded', () => {
    const btnGoogle = document.getElementById('btn-google');
    const btnFacebook = document.getElementById('btn-facebook');

    btnGoogle?.addEventListener('click', async () => {
        btnGoogle.disabled = true;
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('Usuario de Google:', user);
            const existeUsuario = await comprobarUsuarioLogin(user.uid, user.email);
            if (existeUsuario === true) {
                const datosUsuario = await getDatosUsuarioUID(user.uid);
                console.log(datosUsuario);
                sessionStorage.setItem("usuario", JSON.stringify(datosUsuario));
                window.location.href = '/Home';
            } else {
                sessionStorage.setItem("usuarioprovisional", JSON.stringify({
                    uid: user.uid,
                    nombre: user.displayName,
                    email: user.email
                }));
                window.location.href = '/Registro';
            }
        } catch (error) {
            console.error(error);
        } finally {
            btnGoogle.disabled = false;
        }
    });

    btnFacebook?.addEventListener('click', async () => {
        btnFacebook.disabled = true;
        const provider = new FacebookAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('Usuario de Facebook:', user);
            const existeUsuario = await comprobarUsuarioLogin(user.uid);
            if (existeUsuario === true) {
                const datosUsuario = await getDatosUsuarioUID(user.uid);
                sessionStorage.setItem("usuario", JSON.stringify(datosUsuario));
                window.location.href = '/Home';
            } else {
                sessionStorage.setItem("usuarioprovisional", JSON.stringify({
                    uid: user.uid,
                    nombre: user.displayName,
                    email: user.email
                }));
                window.location.href = '/Registro';
            }
        } catch (error) {
            console.error(error);
        } finally {
            btnFacebook.disabled = false;
        }
    });

    document.getElementById("form-login")?.addEventListener("submit", async function (event) {
        event.preventDefault();
        const nombreUsuario = document.getElementById("nombre_usuario").value;
        const contrasena = document.getElementById("contrasena").value;

        try {
            const usuario = await login(nombreUsuario, contrasena);
            if (usuario) {
                sessionStorage.setItem("usuario", JSON.stringify(usuario));
                window.location.href = '/Home';
            }
        } catch (error) {
            const dialog = document.getElementById("login-error-dialog");
            const message = document.getElementById("login-error-message");
            message.textContent = error.message || "Ha ocurrido un error al iniciar sesión.";
            dialog.showModal();

            document.getElementById("close-error-dialog").onclick = () => {
                dialog.close();
            };
        }
    });
});
