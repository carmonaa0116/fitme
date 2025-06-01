import { actualizarUsuario, getFotoPerfilBase64 } from "./api/apiEjercicios";



document.addEventListener("DOMContentLoaded", async () => {
    const datosUsuarioString = sessionStorage.getItem('usuario');
    const datosUsuario = JSON.parse(datosUsuarioString);
    console.log("Datos del usuario:", datosUsuario);
    await cargarContenido();
});

async function cargarContenido() {
    const datosUsuarioString = sessionStorage.getItem('usuario');
    const datosUsuario = JSON.parse(datosUsuarioString);
    await cargarContenidoUsuario();
    await cargarContenidoDialog();
}

async function cargarContenidoUsuario() {
    const datosUsuarioString = sessionStorage.getItem('usuario');
    const datosUsuario = JSON.parse(datosUsuarioString);
    const perfil_img = document.getElementById('profile-img');
    const perfil_usuario = document.getElementById('perfil_usuario');
    const perfil_nombre = document.getElementById('perfil_nombre');
    const perfil_correo = document.getElementById('perfil_correo');
    const perfil_sexo = document.getElementById('perfil_sexo');
    const perfil_fechaNac = document.getElementById('perfil_fechaNac');
    const perfil_experiencia = document.getElementById('perfil_experiencia');
    const perfil_altura = document.getElementById('perfil_altura');
    const perfil_peso = document.getElementById('perfil_peso');

    let fotoPerfilBase64 = await getFotoPerfilBase64(datosUsuario.id);

    if (perfil_img) {
        perfil_img.src = fotoPerfilBase64
            ? `data:image/png;base64,${fotoPerfilBase64}`
            : '/src/assets/user-icon.png';
    }

    console.log(perfil_img.src);

    perfil_usuario.textContent = datosUsuario.nombre_usuario;
    perfil_nombre.textContent = datosUsuario.nombre;
    perfil_correo.textContent = datosUsuario.email;
    perfil_sexo.textContent = datosUsuario.sexo;
    perfil_fechaNac.textContent = formatearFecha(datosUsuario.fecha_nacimiento);
    perfil_experiencia.textContent = datosUsuario.experiencia;
    perfil_altura.textContent = datosUsuario.altura;
    perfil_peso.textContent = datosUsuario.peso;
}

async function cargarContenidoDialog() {
    const datosUsuarioString = sessionStorage.getItem('usuario');
    const datosUsuario = JSON.parse(datosUsuarioString);
    let fotoPerfilBase64 = await getFotoPerfilBase64(datosUsuario.id);
    const editBtn = document.getElementById("editProfileBtn");
    const dialog = document.getElementById("editProfileDialog");

    dialog.innerHTML = `
    <form method="dialog" id="editProfileForm">
        <h2>Editar Perfil</h2>

        <label for="profilePicture">Foto de perfil:</label>
        <div>
            <img id="profilePicturePreview" src="data:image/png;base64,${fotoPerfilBase64}" alt="Foto de perfil" style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%;" />
        </div>
        <input type="file" id="profilePicture" name="foto_perfil" accept="image/*" onchange="previewProfilePicture(event)" />
        <br/><br/>

        <label for="username">Nombre de usuario:</label>
        <input type="text" id="username" name="nombre_usuario" value="${datosUsuario.nombre_usuario}" required />

        <label for="name">Nombre:</label>
        <input type="text" id="name" name="nombre" value="${datosUsuario.nombre}" required />

        <label for="sexo">Sexo:</label>
        <select id="sexo" name="sexo" required>
            <option value="M" ${datosUsuario.sexo === 'Hombre' ? 'selected' : ''}>Hombre</option>
            <option value="F" ${datosUsuario.sexo === 'Mujer' ? 'selected' : ''}>Mujer</option>
            <option value="O" ${datosUsuario.sexo === 'Otro' ? 'selected' : ''}>Otro</option>
        </select>

        <label for="dob">Fecha de nacimiento:</label>
        <input type="date" id="dob" name="fecha_nacimiento" value="${datosUsuario.fecha_nacimiento}" required />

        <label for="experiencia">Experiencia:</label>
        <input type="text" id="experiencia" name="experiencia" value="${datosUsuario.experiencia}" required />

        <label for="altura">Altura (cm):</label>
        <input type="number" id="altura" name="altura" value="${datosUsuario.altura}" required />

        <label for="peso">Peso (kg):</label>
        <input type="number" id="peso" name="peso" value="${datosUsuario.peso}" required />

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value="${datosUsuario.email}" required />

        <div class="dialog-buttons">
            <button type="submit" id="saveBtn">Guardar</button>
            <button type="button" id="cancelBtn">Cancelar</button>
        </div>
        <div id="mensajeExito" style="display:none; color: green; margin-top: 10px;">Perfil actualizado correctamente</div>
    </form>
    `;

    window.previewProfilePicture = function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profilePicturePreview').src = e.target.result;
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const cancelBtn = document.getElementById("cancelBtn");
    const form = document.getElementById("editProfileForm");
    const profilePictureInput = document.getElementById("profilePicture");
    const mensajeExito = document.getElementById("mensajeExito");

    if (editBtn) {
        editBtn.addEventListener("click", () => {
            if (dialog) dialog.showModal();
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => dialog.close());
    }

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            let foto_perfil_base64 = null;
            const archivo = profilePictureInput.files[0];

            if (archivo) {
                foto_perfil_base64 = await convertirArchivoABase64(archivo);
                foto_perfil_base64 = foto_perfil_base64.split(',')[1];
            }

            let updatedData = {
                nombre_usuario: form.username.value,
                nombre: form.name.value,
                sexo: form.sexo.value,
                fecha_nacimiento: form.dob.value,
                experiencia: form.experiencia.value,
                altura: parseFloat(form.altura.value),
                peso: parseFloat(form.peso.value),
                email: form.email.value,
            };

            if (foto_perfil_base64) {
                updatedData.foto_perfil = foto_perfil_base64;
            }

            // Formatear sexo para mostrar en interfaz
            updatedData.sexo = (updatedData.sexo === 'M') ? 'Hombre' :
                (updatedData.sexo === 'F') ? 'Mujer' :
                    (updatedData.sexo === 'O') ? 'Otro' : updatedData.sexo;

            const resultado = await actualizarUsuario(updatedData);

            if (resultado.mensaje === "Usuario actualizado correctamente") {
                const nuevoUsuario = {
                    ...datosUsuario,
                    ...updatedData
                };

                sessionStorage.setItem('usuario', JSON.stringify(nuevoUsuario));
                dialog.close();
                await cargarContenido();

                mensajeExito.style.display = "block";
                setTimeout(() => mensajeExito.style.display = "none", 3000);
            } else {
                console.error("Error al actualizar: " + resultado.error);
            }
        });
    }
}

function convertirArchivoABase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Error al leer la imagen."));
        reader.readAsDataURL(file);
    });
}

function formatearFecha(fecha) {
    if (!fecha || typeof fecha !== "string") return "";
    return fecha.split('-')
        .map((parte, index) => index === 0 ? parte : parte.padStart(2, '0'))
        .reverse()
        .join('-');
}
