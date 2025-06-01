import { comprobarUsuario, registrar } from './api/apiEjercicios.js';


document.addEventListener('DOMContentLoaded', () => {

    const usuarioprovisional = sessionStorage.getItem('usuarioprovisional');
    
    if (usuarioprovisional) {
        const userData = JSON.parse(usuarioprovisional);
        console.log(userData);
        const uid = userData.uid;
        const nombre = userData.nombre;
        const email = userData.email;

        console.log('UID:', uid);
        console.log('Nombre:', nombre);
        console.log('Email:', email);

        const inputNombreUsuario = document.getElementById('nombre_usuario');
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
            const existe = await comprobarUsuario(usuario);
            if (usuario.length < 4) {
                alert('El nombre de usuario debe tener más de 4 caracteres');
                return;
            }

            if (!existe) {
                alert('No se puede registrar con ese nombre de usuario. No debe existir previamente');
                return;
            }

            const datos = {
                uid: uid,
                nombre_usuario: usuario,
                nombre: nombre,
                sexo: selectSexo.value,
                fecha_nacimiento: inputFechaNacimiento.value,
                experiencia: selectExperiencia.value,
                altura: inputAltura.value,
                peso: inputPeso.value,
                email: email
                
            };

            const registro = await registrar(datos);

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


    } else {
        window.location.href = '/';
    }


    /*
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
        }
    });
    */

});
