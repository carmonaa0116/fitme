import { getRutina, getTodosDatosEjercicios, getEjerciciosPorDia, actualizarVisitasRutina } from "/src/js/api/apiEjercicios";


document.addEventListener("DOMContentLoaded", async () => {

    const nombreRutina = document.getElementById("nombreRutina");
    const diasRutina = document.getElementById("diasRutina");
    const params = new URLSearchParams(window.location.search);
    const idRecibido = params.get("id");
    const divIdRecibido = document.querySelector(".idRecibido");
    actualizarVisitasRutina(idRecibido);
    if (divIdRecibido) {
        divIdRecibido.innerHTML = `ID recibido: ${idRecibido}`;
    }

    async function cargarTopRutinas() {
        const divTopRutinas = document.getElementById("div-rutinas-comunidad");
        console.log(divTopRutinas)
        const topRutinas = await getTodosDatosEjercicios();
    }

    async function cargarContenidoRutina() {
        diasRutina.innerHTML = ""; // Limpiar contenido anterior
        const ordenDias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
        const rutina = await getRutina(idRecibido);
        console.log("Rutina recibida:", rutina.rutina.rutina_nombre);
        nombreRutina.innerHTML = rutina.rutina.rutina_nombre;
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
            `;
            diasRutina.appendChild(divDia);
        }
    }

    // Inicializa todo
   await cargarContenidoRutina();
   await cargarTopRutinas();
});
