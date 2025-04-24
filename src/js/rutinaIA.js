import { guardarRutinaEnBD } from "./api/apiEjercicios.js";
import puter from 'puter';

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("form-rutinaIA");

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe de manera tradicional

    console.log("Formulario enviado.");

    // Obtener datos de sesión del usuario
    const datosSesion = JSON.parse(sessionStorage.getItem("usuario"));
    console.log("Datos de sesión obtenidos del sessionStorage:", datosSesion);

    // Calcular la edad del usuario
    const edad = new Date().getFullYear() - new Date(datosSesion.fecha_nacimiento).getFullYear();
    console.log("Edad calculada:", edad);

    // Obtener los valores del formulario
    const objetivo = document.getElementById("objetivo").value;
    const tiempo = document.getElementById("tiempo").value;
    const dias = document.getElementById("dias").value;
    const limitaciones = document.getElementById("limitaciones").value;

    console.log("Datos del formulario:");
    console.log("Objetivo:", objetivo);
    console.log("Tiempo disponible:", tiempo);
    console.log("Días por semana:", dias);
    console.log("Limitaciones físicas:", limitaciones);

    // Crear el prompt para la IA
    const prompt = `
Eres un entrenador personal experto. Genera una rutina de entrenamiento para el siguiente usuario:

- Nombre: ${datosSesion.nombre}
- Edad: ${edad}
- Sexo: ${datosSesion.sexo}
- Altura: ${datosSesion.altura} cm
- Peso: ${datosSesion.peso} kg
- Nivel de experiencia: ${datosSesion.experiencia}
- Objetivo: ${objetivo.replace("_", " ")}
- Tiempo disponible por sesión: ${tiempo} minutos
- Días por semana: ${dias}
- Limitaciones físicas: ${limitaciones || "Ninguna"}

Devuelve **únicamente** un objeto JSON, sin ningún otro texto fuera de este formato. La estructura del JSON debe ser la siguiente:

{
  "usuario": {
    "nombre": "...",
    "edad": ...,
    "sexo": "...",
    "objetivo": "...",
    "dias_por_semana": ...,
    "tiempo_por_sesion": ...,
    "limitaciones": "..."
  },
  "rutina": {
    "dia_1": {
      "calentamiento": ["..."],
      "ejercicios": [
        { "nombre": "...", "series": ..., "repeticiones": ... }
      ],
      "estiramientos": ["..."]
    },
    "dia_2": {
      ...
    }
  }
}

**No añadas ningún texto fuera del JSON.**
`;

    console.log("Prompt enviado a la IA:", prompt);

    try {
      // Enviar el prompt a la IA para obtener la rutina
      const respuestaIA = await puter.ai.chat(prompt);
      console.log("Respuesta de IA recibida:", respuestaIA);

      let rutina;

      try {
        // Parsear la respuesta de la IA
        rutina = JSON.parse(respuestaIA);
        console.log("Rutina parseada correctamente:", rutina);
      } catch (e) {
        console.error("Error al parsear JSON:", e);
        alert("La IA no devolvió una rutina válida.");
        return;
      }

      // Guardar la rutina en la base de datos
      console.log("Guardando rutina en la base de datos...");
      const resultado = await guardarRutinaEnBD(
        datosSesion.id_usuario,
        rutina,
        "http://localhost/php-fitme/guardarRutina.php"
      );

      console.log("Resultado de guardarRutinaEnBD:", resultado);

      if (resultado.success) {
        alert("Rutina guardada correctamente en la base de datos.");
      } else {
        alert("Error al guardar en la base de datos.");
        console.error("Detalles del error al guardar:", resultado.error);
      }

    } catch (error) {
      console.error("Error general:", error);
      alert("Hubo un problema al generar o guardar la rutina.");
    }
  });
});
