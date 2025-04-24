import { insertarRutina, getRutinasUser } from "./api/apiEjercicios";

const btnCrearRutina = document.getElementById("btn-crear-rutina");
const dialogoCrearRutina = document.getElementById("dialog-crear-rutina");
const btnCerrarDialogo = document.getElementById("btn-cerrar-dialogo");
const formCrearRutina = document.getElementById("form-crear-rutina");
const divRutinas = document.getElementById("div-rutinas");

document.addEventListener("DOMContentLoaded", () => {
    cargarRutinas(); // Cargar rutinas al inicio
});

// Abrir el diálogo para crear una rutina
btnCrearRutina.addEventListener("click", () => {
    dialogoCrearRutina.showModal();
});

// Cerrar el diálogo de creación de rutina
btnCerrarDialogo.addEventListener("click", () => {
    dialogoCrearRutina.close();
});

async function cargarRutinas() {
    const usuarioJSON = sessionStorage.getItem("usuario");
    divRutinas.innerHTML = ""; // Limpiar el contenido anterior

    if (usuarioJSON) {
        const usuario = JSON.parse(usuarioJSON);
        const rutinas = await getRutinasUser(usuario.id);

        console.log(rutinas); // Verifica que las rutinas se obtienen correctamente

        if (rutinas.mensaje) {
            divRutinas.innerHTML = `
        <div class="info-usuario">
          <h3>${rutinas.mensaje}</h3>
        </div>
      `;
        } else {
            // Mostrar las rutinas si están disponibles
            rutinas.forEach((rutina) => {
                const divRutina = document.createElement("div");
                divRutina.classList.add("rutina");
                divRutina.style.border = "1px solid #ccc";
                divRutina.style.borderRadius = "10px";
                divRutina.style.padding = "10px";
                divRutina.style.margin = "10px 0";

                const h2 = document.createElement("h2");
                h2.textContent = `${rutina.nombre} 💪`;

                const p = document.createElement("p");
                p.textContent = `Días de la semana: ${rutina.dias.join(", ")}`;

                divRutina.appendChild(h2);
                divRutina.appendChild(p);

                // Efecto hover
                divRutina.addEventListener("mouseover", () => {
                    divRutina.style.backgroundColor = "var(--red)";
                    divRutina.style.cursor = "pointer";
                    divRutina.style.color = "white";
                    divRutina.style.transition = "background-color 0.3s ease, color 0.3s ease";

                });
                divRutina.addEventListener("mouseout", () => {
                    divRutina.style.backgroundColor = "";
                });

                divRutina.addEventListener("click", () => {
                    // Redirigir a la página de ejercicios de la rutina
                    window.location.href = `/EjerciciosRutina?id=${rutina.id}`;
                });

                divRutinas.appendChild(divRutina);
            });
        }
    } else {
        divRutinas.innerHTML = `
      <div class="info-usuario">
        <h2>Por favor, inicia sesión para ver tus rutinas.</h2>
      </div>
    `;
    }
}

// Manejar el envío del formulario de creación de rutina
formCrearRutina.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evitar recarga

    const nombreRutina = document.getElementById("nombre-rutina").value.trim();
    const diasSeleccionados = Array.from(
        document.querySelectorAll(".inputDiaSemana:checked")
    ).map((checkbox) => checkbox.value);

    if (!nombreRutina || diasSeleccionados.length === 0) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const nuevaRutina = {
        nombre: nombreRutina,
        dias: diasSeleccionados,
    };

    await insertarRutina(nuevaRutina.nombre, nuevaRutina.dias);

    dialogoCrearRutina.close();
    formCrearRutina.reset(); // Limpiar el formulario
    cargarRutinas(); // Recargar las rutinas
});

// Estilo dinámico para los días de la semana
document.querySelectorAll(".inputDiaSemana").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        const label = checkbox.closest(".labelDiaSemana");
        if (checkbox.checked) {
            label.classList.add("activo");
        } else {
            label.classList.remove("activo");
        }
    });
});
