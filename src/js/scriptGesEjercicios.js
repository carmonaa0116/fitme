// Importación de módulos
import { editarEjercicio, eliminarEjercicio, getMusculos, getMusculosEjercicio, getTodosDatosEjercicios, insertarEjercicios } from "./api/apiEjercicios.js";

// Función principal que se ejecuta cuando la página está cargada
document.addEventListener("DOMContentLoaded", async () => {
    console.log('Se ha cargado el js')
    const buttonInsertarEjercicio = document.getElementById("button-insertar-ejercicio");
    if (buttonInsertarEjercicio) {
        buttonInsertarEjercicio.addEventListener("click", () => {
            abrirDialogoInsercionEjercicio();
        });
    }
    await generarContenidoDivEjercicios();
});

async function generarContenidoDivEjercicios() {
    const divEjercicios = document.getElementById("div-ejercicios");
    if (divEjercicios) {
        // Obtener los ejercicios desde la API
        const ejerciciosJSON = await getTodosDatosEjercicios();
        console.log(ejerciciosJSON)
        // Limpiar contenido previo antes de agregar los nuevos ejercicios
        divEjercicios.innerHTML = "";

        // Verificar si hay ejercicios
        if (ejerciciosJSON.length === 0) {
            divEjercicios.innerHTML = "<p>No hay ejercicios disponibles.</p>";
            return;
        }

        // Crear y agregar los ejercicios dinámicamente
        ejerciciosJSON.ejercicios.forEach(ejercicio => {
            const ejercicioCard = document.createElement("div");
            ejercicioCard.classList.add("card-ejercicio");
            ejercicioCard.innerHTML = `
            <div class="imagen-ejercicio">
                <img src="${ejercicio.imagen}" alt="Imagen de ${ejercicio.nombre}">
            </div>
            <div class="informacion-ejercicio">
                <h3>${ejercicio.nombre}</h3>
                <p class="musculos">Músculos trabajados: ${ejercicio.musculos.join(", ")}</p>
                <a class="video-link" href="${ejercicio.video}" target="_blank">Ver Técnica</a>
            </div>
            `;

            ejercicioCard.addEventListener("click", () => {
                abrirDialogoEdicionEjercicio(ejercicio);
            });

            divEjercicios.appendChild(ejercicioCard);
        });
    }
}

async function abrirDialogoEdicionEjercicio(ejercicio) {
    console.log(ejercicio);
    const musculos = await getMusculos();
    console.log(musculos);

    // Asegurar que ejercicio.musculos es un array de números
    const musculosEjercicio = await getMusculosEjercicio(ejercicio.id);
    console.log(musculosEjercicio);

    const dialog = document.getElementById("dialog-ges-ejercicio");
    if (dialog) {
        dialog.innerHTML = `
            <div>
                <h2>Editar Ejercicio</h2>
                <form id="form-insertar-ejercicio">
                    <input type="hidden" id="id" name="id" value="${ejercicio.id}">
                    
                    <div>
                        <label for="nombre">Nombre del ejercicio:</label>
                        <input type="text" id="nombre" name="nombre" value="${ejercicio.nombre}" required>
                    </div>
                    
                    <div>
                        <label for="imagen">Imagen del ejercicio:</label>
                        <input type="file" id="imagen" name="imagen" accept="image/*">
                    </div>
                    
                    <div>
                        <label for="video">Video del ejercicio (enlace):</label>
                        <input type="url" id="video" name="video" value="${ejercicio.video}" required>
                    </div>

                    <div id="div-musculos">
                        <span>Músculos trabajados:</span>
                        ${musculos.map(musculo => {
                            console.log(musculo);
                            let isChecked = isMuscleChecked(musculosEjercicio, musculo.id) ? "checked" : console.log('no');
                            return `
                                <div class="musculo">
                                    <input type="checkbox" id="musculo-${musculo.id}" name="musculos[]" value="${musculo.id}" ${isChecked}>
                                    <label for="musculo-${musculo.id}">${musculo.nombre}</label>
                                </div>
                            `;
                        }).join("")}
                    </div>
                    <button type="submit">Guardar Cambios</button>
                    <button id="button-eliminar">Eliminar</button>
                    <button type="button" id="button-cancelar">Cancelar</button>
                </form>
            </div>
        `;

        const buttonCancelar = document.getElementById("button-cancelar");
        buttonCancelar.addEventListener("click", () => {
            dialog.close();
        });

        const buttonBorrar = document.getElementById("button-eliminar");
        buttonBorrar.addEventListener("click", async () => {
            await eliminarEjercicio(ejercicio.id);
            await generarContenidoDivEjercicios();
            dialog.close();
        });

        // Manejador del formulario
        const formEditarEjercicio = document.getElementById("form-insertar-ejercicio");
        formEditarEjercicio.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(formEditarEjercicio);
            const id = formData.get("id");
            const nombre = formData.get("nombre");
            const imagen = formData.get("imagen");
            const video = formData.get("video");
            const musculosSeleccionados = formData.getAll("musculos[]").map(Number);
            await editarEjercicio(id, nombre, imagen, video, musculosSeleccionados);
            await generarContenidoDivEjercicios();
            dialog.close();
        });

        dialog.showModal();
    }
}

function isMuscleChecked(musculosEjercicio, idBuscado) {
    let idBuscadoString = String(idBuscado);

    let encontrado = false;
    musculosEjercicio.musculos.forEach(musculo => {
        let musculoString = String(musculo.id);
        if (musculoString === idBuscadoString) {
            console.log(musculoString+" es igual que "+idBuscadoString);
            encontrado = true;
            return false; // Se utiliza return false para parar el forEach
        }
    });
    return encontrado;
}
async function abrirDialogoInsercionEjercicio() {
    const dialog = document.getElementById("dialog-ges-ejercicio");
    if (dialog) {
        dialog.innerHTML = `
            <div>
                <h2>Insertar Ejercicio</h2>
                <form id="form-insertar-ejercicio">
                    <!-- Sección del nombre -->
                    <div>
                        <label for="nombre">Nombre del ejercicio:</label>
                        <input type="text" id="nombre" name="nombre" required />
                    </div>

                    <!-- Sección de imagen -->
                    <div>
                        <label for="imagen">Imagen del ejercicio:</label>
                        <input type="file" id="imagen" name="imagen" accept="image/*" required />
                    </div>

                    <!-- Sección del video -->
                    <div>
                        <label for="video">Video del ejercicio (enlace):</label>
                        <input type="url" id="video" name="video" required />
                    </div>

                    <!-- Sección de músculos -->
                    <div id="div-musculos">
                        <label for="select-musculos">Elige los músculos implicados</label>
                        <div id="checkbox-musculos"></div>
                    </div>

                    <!-- Botones de acción -->
                    <div>
                        <button type="submit">Insertar</button>
                        <button type="button" id="cancelar">Cerrar Ventana</button>
                    </div>
                </form>
            </div>
        `;

        const buttonCancelar = document.getElementById("cancelar");
        if (buttonCancelar) {
            buttonCancelar.addEventListener("click", () => {
                dialog.close();
            });
        }

        // Obtener y crear los checkboxes de músculos
        const musculos = await getMusculos();
        crearCheckboxMusculos(musculos);

        const formInsertarEjercicio = document.getElementById("form-insertar-ejercicio");
        if (formInsertarEjercicio) {
            formInsertarEjercicio.addEventListener("submit", async (e) => {
                e.preventDefault();

                const nombre = document.getElementById("nombre")?.value;
                const imagenInput = document.getElementById("imagen");
                const video = document.getElementById("video")?.value;

                // Obtener los checkboxes marcados
                const musculosMarcados = [...document.querySelectorAll('input[name="musculos"]:checked')]
                    .map(input => input.value);

                // Validar que al menos un checkbox esté seleccionado
                if (musculosMarcados.length === 0) {
                    alert("Debes seleccionar al menos un músculo.");
                    return;
                }

                console.log("Músculos seleccionados:", musculosMarcados);

                // Verificar si los campos requeridos tienen datos
                if (nombre && imagenInput && imagenInput.files.length > 0 && video) {
                    // Crear el FormData
                    const formData = new FormData();
                    formData.append("nombre", nombre);
                    formData.append("imagen", imagenInput.files[0]);
                    formData.append("video", video);

                    // Agregar los músculos seleccionados al FormData
                    musculosMarcados.forEach(musculo => formData.append("musculos[]", musculo));

                    // Enviar los datos al servidor
                    let insertar = await insertarEjercicios(formData);
                    console.log(insertar);
                } else {
                    console.error("Faltan datos o son null -> " + nombre + " " + imagenInput + " " + video + " " + musculosMarcados);
                }

                await generarContenidoDivEjercicios();
            });
        }

        dialog.showModal();
    }
}

// Función para crear los checkboxes de los músculos
function crearCheckboxMusculos(musculos) {
    const checkboxMusculos = document.getElementById("checkbox-musculos");
    if (checkboxMusculos) {
        musculos.forEach(musculo => {
            const checkbox = document.createElement("div");
            checkbox.classList.add("musculo");

            const input = document.createElement("input");
            input.type = "checkbox";
            input.name = "musculos";
            input.value = musculo.id;
            input.id = "musculo-" + musculo.id;

            const label = document.createElement("label");
            label.htmlFor = input.id;
            label.textContent = musculo.nombre;

            checkbox.appendChild(input);
            checkbox.appendChild(label);
            checkboxMusculos.appendChild(checkbox);
        });
    }
}



