import { getMusculos, insertarEjercicios } from "./api/apiEjercicios.js";

document.addEventListener("DOMContentLoaded", async () => {
    let musculos = await getMusculos();
    console.log(musculos);
    crearCheckboxMusculos(musculos);
});

// Mostrar el dialog al hacer clic en el botón
const buttonInsertarEjercicio = document.getElementById("button-insertar-ejercicio");
if (buttonInsertarEjercicio) {
    buttonInsertarEjercicio.addEventListener("click", () => {
        const dialog = document.getElementById("dialog-insertar-ejercicio");
        if (dialog) {
            dialog.showModal();
        }
    });
}

// Cerrar el dialog al hacer clic en cancelar
const cancelarButton = document.getElementById("cancelar");
if (cancelarButton) {
    cancelarButton.addEventListener("click", () => {
        const dialog = document.getElementById("dialog-insertar-ejercicio");
        if (dialog) {
            dialog.close();
        }
    });
}

// Manejar el formulario de inserción de ejercicios
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
    });
}

function crearCheckboxMusculos(musculos) {
    console.log(musculos);
    const checkboxMusculos = document.getElementById("checkbox-musculos");

    musculos.forEach(musculo => {
        const checkbox = document.createElement("div");
        checkbox.classList.add("musculo");

        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = "musculos";
        input.value = musculo.id;
        input.id = "musculo-" + musculo.id; // Se asigna un id único

        const label = document.createElement("label");
        label.htmlFor = input.id;
        label.textContent = musculo.nombre;

        checkbox.appendChild(input);
        checkbox.appendChild(label);

        checkboxMusculos.appendChild(checkbox);
    });
}
