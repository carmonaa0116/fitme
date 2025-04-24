import { getRutinasUser } from "/src/js/api/apiEjercicios.js"; // Importa la función desde api.js
// Obtener datos del usuario desde sessionStorage
const usuarioJSON = sessionStorage.getItem("usuario");
const divInfoUsuario = document.getElementById("info-usuario");
const divRutinas = document.getElementById("div-rutinas");
const btnCrearRutina = document.getElementById("btn-crear-rutina");

// Lógica del botón para crear una rutina
btnCrearRutina.addEventListener("click", () => {
  window.location.href = "/CrearRutina"; // Redirige a la página de crear rutina
});

// Función principal para manejar la información del usuario
async function cargarRutinas() {
  if (usuarioJSON) {
    const usuario = JSON.parse(usuarioJSON);

    // Mostrar información del usuario
    divInfoUsuario.innerHTML = `
      <div class="info-usuario">
        <h2>Hola, ${usuario.nombre_usuario}</h2>
      </div>
    `;

    // Llamar a la función getRutinasUser con el id del usuario
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
      let rutinasHTML = "";
      rutinas.forEach(rutina => {
        rutinasHTML += `
          <div class="dia-rutina">
            <h2>Rutina #${rutina.id}</h2>
            <p>${rutina.rutina}</p>
          </div>
        `;
      });
      divRutinas.innerHTML = rutinasHTML;
    }
  } else {
    divInfoUsuario.innerHTML = `
      <div class="info-usuario">
        <h2>Por favor, inicia sesión para ver tus rutinas.</h2>
      </div>
    `;
  }
}

// Cargar las rutinas cuando la página se cargue
cargarRutinas();