import { comprobarUsuario, registrarConEmail } from './api/apiEjercicios.js';
import { auth } from '../firebase.js';  // Importa el auth inicializado
import { createUserWithEmailAndPassword } from "firebase/auth";

// Elimina esta línea porque `auth` ya lo importaste y no necesitas llamar getAuth()
// const auth = getAuth();

document.addEventListener('DOMContentLoaded', () => {
    const provider = 'email';

    const inputNombreUsuario = document.getElementById('nombre_usuario');
    const inputEmail = document.getElementById('email');
    const inputPassword = document.getElementById('password');
    const selectSexo = document.getElementById('sexo');
    const inputFechaNacimiento = document.getElementById('fecha_nacimiento');
    const selectExperiencia = document.getElementById('experiencia');
    const inputAltura = document.getElementById('altura');
    const inputPeso = document.getElementById('peso');
    const mensajeNU = document.getElementById('mensajeNU');

    const formRegistro = document.getElementById('form-registro');

    formRegistro.addEventListener('submit', async (e) => {
        e.preventDefault();

        const usuario = inputNombreUsuario.value.trim();
        const email = inputEmail.value.trim();
        const password = inputPassword.value.trim();
        const nombre = usuario;

        console.log('Datos ingresados:', {
            usuario,
            email,
            password,
            nombre
        });

        if (usuario.length < 4) {
            alert('El nombre de usuario debe tener más de 4 caracteres');
            return;
        }

        if (!email || !password) {
            alert('Debes ingresar un email y una contraseña');
            return;
        }

        const existe = await comprobarUsuario(usuario);
        if (!existe) {
            alert('No se puede registrar con ese nombre de usuario. No debe existir previamente');
            return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        console.log('UID generado por Firebase:', uid);

        const datos = {
            uid: uid,
            nombre_usuario: usuario,
            nombre: nombre,
            password: password,
            sexo: selectSexo.value,
            fecha_nacimiento: inputFechaNacimiento.value,
            experiencia: selectExperiencia.value,
            altura: inputAltura.value,
            peso: inputPeso.value,
            email: email,
            provider: provider
        };
        
        console.log('Datos del usuario a registrar:', datos);

        const registro = await registrarConEmail(datos);

        if (registro?.mensaje === true) {
            sessionStorage.setItem('usuario', JSON.stringify(registro.usuario));
            window.location.href = '/Home';
        } else {
            const dialog = document.getElementById('dialog-mensaje');
            const dialogText = document.getElementById('dialog-text');
            dialogText.textContent = `Error al registrar: ${registro?.error || 'Error desconocido'}`;
            dialog.showModal();
        }

    });
});
