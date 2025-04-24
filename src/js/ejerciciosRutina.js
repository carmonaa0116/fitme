import {
    deleteRutina,
    getRutina,
    getTodosDatosEjercicios,
    insertarEjercicioRutinaDia,
    getEjerciciosPorDia,
    deleteEjercicioRutinaDia,
    getIdEjercicio,
    editarEjercicioRutinaDia
} from "../js/api/apiEjercicios";
document.addEventListener("DOMContentLoaded", () => {
    const diasRutina = document.getElementById("diasRutina");
    const params = new URLSearchParams(window.location.search);
    const idRecibido = params.get("id");
    const divIdRecibido = document.querySelector(".idRecibido");

    if (divIdRecibido) {
        divIdRecibido.innerHTML = `ID recibido: ${idRecibido}`;
    }

    async function cargarContenidoRutina() {
        diasRutina.innerHTML = ""; // Limpiar contenido anterior
        const ordenDias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        const rutina = await getRutina(idRecibido);
        let diasArray = rutina.rutina.dias.split(",");

        diasArray = diasArray
            .map(d => d.trim().toUpperCase())
            .sort((a, b) => ordenDias.indexOf(a) - ordenDias.indexOf(b));

        for (const dia of diasArray) {
            const ejerciciosRutinaDia = await getEjerciciosPorDia(idRecibido, dia);
            const divDia = document.createElement("div");
            divDia.classList.add("diaRutina");

            let listaEjerciciosHTML = "";

            if (ejerciciosRutinaDia && ejerciciosRutinaDia.length > 0) {
                ejerciciosRutinaDia.forEach(ejercicio => {
                    listaEjerciciosHTML += `
                        <li class="ejercicioItem">
                            <ul class="detalleEjercicio" data-dia="${dia}">
                                <li class="nombreEjercicio">Ejercicio: ${ejercicio.nombre}</li>
                                <li class="seriesEjercicio">Series: ${ejercicio.series}</li>
                                <li class="repeticionesEjercicio">Rango de repeticiones: ${ejercicio.repeticionesInicio}-${ejercicio.repeticionesFin}</li>
                                ${ejercicio.peso ? `<li class="pesoEjercicio">Peso: ${ejercicio.peso} kg</li>` : ""}
                            </ul>
                        </li>
                    `;
                });
            } else {
                listaEjerciciosHTML = `<li>No hay ejercicios agregados para este día.</li>`;
            }

            divDia.innerHTML = `
                <h2 class="diaTitulo">${dia}</h2>
                <p class="diaDescripcion">Ejercicios para el ${dia}:</p>
                <ol id="ejerciciosDia${dia}" class="listaEjercicios">
                    ${listaEjerciciosHTML}
                </ol>
                <button class="btn btn-primary btnAgregarEjercicios" id="btnDia${dia}">Agregar ejercicios</button>
            `;
            diasRutina.appendChild(divDia);

            const botonAgregar = divDia.querySelector(`#btnDia${dia}`);
            const dialogAgregarEjercicio = document.getElementById("dialogAgregarEjercicio");
            const ejerciciosJSON = await getTodosDatosEjercicios();

            botonAgregar.addEventListener("click", () => {
                dialogAgregarEjercicio.innerHTML = `
                    <div class="dialogContent">
                        <h3>Agregar Ejercicio para ${dia}</h3>
                        <form id="formAgregarEjercicio">
                            <label for="selectEjercicio">Ejercicio:</label>
                            <select id="selectEjercicio" name="nombreEjercicio">
                                ${ejerciciosJSON.ejercicios.map(ejercicio => `
                                    <option value="${ejercicio.id}">${ejercicio.nombre}</option>
                                `).join("")}
                            </select>
                            <label for="inputSeries">Series:</label>
                            <input type="number" id="inputSeries" name="series" min="1" required>
                            <label for="inputRepeticionesInicio">Rango inicial de repeticiones:</label>
                            <input type="number" id="inputRepeticionesInicio" name="repeticionesInicio" min="1" required>
                            <label for="inputRepeticionesFin">Rango final de repeticiones:</label>
                            <input type="number" id="inputRepeticionesFin" name="repeticionesFin" min="1" required>
                            <label for="inputPeso">Peso (kg) (opcional):</label>
                            <input type="number" id="inputPeso" name="peso" min="0" step="0.1">
                            <button type="submit" class="btn btn-primary">Agregar</button>
                            <button type="button" class="btn btn-secondary" id="btnCancelar">Cancelar</button>
                        </form>
                    </div>
                `;

                dialogAgregarEjercicio.style.display = "block";
                document.getElementById("btnCancelar").addEventListener("click", () => {
                    dialogAgregarEjercicio.style.display = "none";
                });

                document.getElementById("formAgregarEjercicio").addEventListener("submit", async (event) => {
                    event.preventDefault();
                    const idEjercicio = document.getElementById("selectEjercicio").value;
                    const series = document.getElementById("inputSeries").value;
                    const repeticionesInicio = document.getElementById("inputRepeticionesInicio").value;
                    const repeticionesFin = document.getElementById("inputRepeticionesFin").value;
                    const peso = document.getElementById("inputPeso").value || null;

                    await insertarEjercicioRutinaDia(idRecibido, dia, idEjercicio, series, repeticionesInicio, repeticionesFin, peso);
                    dialogAgregarEjercicio.style.display = "none";
                    await cargarContenidoRutina(); // Recargar contenido
                });
            });

            divDia.querySelectorAll('.detalleEjercicio').forEach(detalle => {
                detalle.addEventListener('click', () => {
                    const nombreEjercicio = detalle.querySelector('.nombreEjercicio').textContent.split(": ")[1];
                    const seriesEjercicio = detalle.querySelector('.seriesEjercicio').textContent.split(": ")[1];
                    const repeticionesEjercicio = detalle.querySelector('.repeticionesEjercicio').textContent.split(": ")[1];
                    const pesoEjercicio = detalle.querySelector('.pesoEjercicio') ? detalle.querySelector('.pesoEjercicio').textContent.split(": ")[1] : '';
                    const dialogEditarEliminar = document.getElementById("dialogAgregarEjercicio");

                    dialogEditarEliminar.innerHTML = `
                        <div class="dialogContent">
                            <h3>Editar o Eliminar Ejercicio</h3>
                            <form id="formEditarEjercicio">
                                <label for="inputNombreEjercicio">Ejercicio:</label>
                                <select id="selectEjercicio" name="nombreEjercicio">
                                ${ejerciciosJSON.ejercicios.map(ejercicio => `
                                    <option value="${ejercicio.id}">${ejercicio.nombre}</option>
                                `).join("")}
                            </select>
                                <label for="inputSeries">Series:</label>
                                <input type="number" id="inputSeries" name="series" min="1" value="${seriesEjercicio}" required>
                                <label for="inputRepeticionesInicio">Rango inicial de repeticiones:</label>
                                <input type="number" id="inputRepeticionesInicio" name="repeticionesInicio" min="1" value="${repeticionesEjercicio.split('-')[0]}" required>
                                <label for="inputRepeticionesFin">Rango final de repeticiones:</label>
                                <input type="number" id="inputRepeticionesFin" name="repeticionesFin" min="1" value="${repeticionesEjercicio.split('-')[1]}" required>
                                <label for="inputPeso">Peso (kg) (opcional):</label>
                                <input type="number" id="inputPeso" name="peso" min="0" step="0.1" value="${pesoEjercicio}">
                                <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                                <button type="button" class="btn btn-danger" id="btnEliminarEjercicio">Eliminar</button>
                                <button type="button" class="btn btn-secondary" id="btnCancelar">Cancelar</button>
                            </form>
                        </div>
                    `;

                    dialogEditarEliminar.style.display = "block";

                    document.getElementById("btnCancelar").addEventListener("click", () => {
                        dialogEditarEliminar.style.display = "none";
                    });

                    document.getElementById("btnEliminarEjercicio").addEventListener("click", async () => {
                        const confirmacion = confirm("¿Estás seguro de que deseas eliminar este ejercicio?");
                        if (confirmacion) {
                            const idEjercicioJSON = await getIdEjercicio(nombreEjercicio);
                            await deleteEjercicioRutinaDia(parseInt(idRecibido), dia, parseInt(idEjercicioJSON.id));
                            dialogEditarEliminar.style.display = "none";
                            await cargarContenidoRutina();
                        }
                    });

                    document.getElementById("formEditarEjercicio").addEventListener("submit", async (event) => {
                        event.preventDefault();

                        const series = document.getElementById("inputSeries").value;
                        const repeticionesInicio = document.getElementById("inputRepeticionesInicio").value;
                        const repeticionesFin = document.getElementById("inputRepeticionesFin").value;
                        const peso = document.getElementById("inputPeso").value || 0;
                        const idEjercicio = document.getElementById('selectEjercicio').value;

                        await editarEjercicioRutinaDia(idRecibido, dia, idEjercicio, series, repeticionesInicio, repeticionesFin, peso);
                        dialogEditarEliminar.style.display = "none";
                        await cargarContenidoRutina(); // Recarga dinámica
                    });
                });
            });
        }

        const buttonEliminarRutina = document.getElementById("buttonEliminarRutina");
        if (buttonEliminarRutina) {
            buttonEliminarRutina.addEventListener("click", async () => {
                const confirmacion = confirm("¿Estás seguro de que deseas eliminar la rutina? Esta acción no se puede deshacer.");
                if (confirmacion) {
                    await deleteRutina(idRecibido);
                    window.location.href = "../Rutinas";
                }
            });
        }
    }

    // Inicializa todo
    cargarContenidoRutina();
});
