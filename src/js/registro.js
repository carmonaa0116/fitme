import { comprobarUsuario, registrar } from './api/apiEjercicios.js';

const inputNombreUsuario = document.getElementById('nombre_usuario');
const inputContrasena = document.getElementById('contrasena');
const inputNombre = document.getElementById('nombre');
const selectSexo = document.getElementById('sexo');
const inputFechaNacimiento = document.getElementById('fecha_nacimiento');  // Cambié la variable de 'fecha_nac' a 'fecha_nacimiento'
const selectExperiencia = document.getElementById('experiencia');
const inputAltura = document.getElementById('altura');
const inputPeso = document.getElementById('peso');
const mensajeNU = document.getElementById('mensajeNU');

inputNombreUsuario.addEventListener('change', async () => {
    const usuario = inputNombreUsuario.value.trim();
    mensajeNU.innerHTML = '';

    if (usuario.length < 4) {
        mensajeNU.innerHTML = 'El nombre de usuario debe tener más de 4 caracteres';
        mensajeNU.style.color = 'var(--red)';
        return;
    }

    const existe = await comprobarUsuario(usuario);

    if (!existe) {
        mensajeNU.innerHTML = 'Ya existe un usuario con ese nombre de usuario';
        mensajeNU.style.color = 'var(--red)';
    } else {
        mensajeNU.innerHTML = 'El nombre de usuario está disponible';
        mensajeNU.style.color = 'var(--white)';
    }
});

const formRegistro = document.getElementById('form-registro');

formRegistro.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = inputNombreUsuario.value.trim();
    const existe = await comprobarUsuario(usuario);

    if (usuario.length < 4 || !existe) {
        alert('No se puede registrar con ese nombre de usuario. Debe tener más de 4 caracteres y no debe existir previamente');
        alert('El nombre de usuario debe tener más de 4 caracteres y no debe existir previamente');
        return;
    }

    const datos = {
        nombre_usuario: usuario,
        contrasena: inputContrasena.value,
        nombre: inputNombre.value,
        sexo: selectSexo.value,
        fecha_nacimiento: inputFechaNacimiento.value,
        fecha_nacimiento: inputFechaNacimiento.value,  // Se usa 'fecha_nacimiento' aquí
        experiencia: selectExperiencia.value,
        altura: parseFloat(inputAltura.value),
        peso: parseFloat(inputPeso.value)
    };

    const registro = await registrar(datos);

    if (registro?.mensaje) {
        if (registro.usuario) {
            sessionStorage.setItem('usuario', JSON.stringify(registro.usuario));
        }
        window.location.href = '/Home';
    } else {
        alert(`Error al registrar: ${registro?.error || 'Error desconocido'}`);
        alert(registro?.error || 'Error desconocido al registrar');
    }
});