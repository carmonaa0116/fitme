import { getDatosSesion } from "/src/js/api/apiEjercicios.js";
const frasesMotivacionales = [
    "Transforma vidas entrenando cuerpos. Tu labor comienza hoy. 💪",
    "Estás a punto de llevar a otros hacia su mejor versión. 🚀",
    "Entrena con propósito, guía con FITME. 🔥",
    "Cambia hábitos en tus clientes, cambia sus resultados. Todo empieza contigo. 🎯",
    "El progreso de tus entrenados no espera. ¡Diseña su rutina personalizada ya! 🏋️‍♂️",
    "Donde tu experiencia se convierte en resultados reales para otros. 📈",
    "Construye sus rutinas, ayúdalos a conquistar sus objetivos. 🏆",
    "La disciplina que tú enseñas se refleja en sus cuerpos. Entrénalos con FITME. 🧠💪",
    "Un clic tuyo puede iniciar su cambio. ¡Toma acción! ✅",
    "Motivación, constancia y FITME: tu fórmula para transformar vidas. ⚡",
    "Cada repetición guiada por ti cuenta. ¡Haz que valga la pena! 🔄",
    "Hoy es el día perfecto para empezar a transformar a tus clientes. ✨",
    "Las metas de tus usuarios necesitan tu guía. ¡Actúa ya con FITME! 🕒",
    "Tu esfuerzo constante crea resultados reales en otros. 💥",
    "Ayúdales a romper sus límites mentales con cada entrenamiento. 🧱",
    "No se trata solo de que ellos sean los mejores, sino de que progresen cada día. 📆",
    "Sus cuerpos reflejan tus decisiones como entrenador. Elige inspirar. 💯",
    "FITME te apoya en cada paso que das para sacar lo mejor de tus clientes. 👣",
    "Comienza hoy a construir los logros de mañana en quienes confían en ti. 🏁"
];
document.addEventListener("DOMContentLoaded", async () => {
    let nombreUsuario = "";
    const datosSesion = await getDatosSesion();
    console.log("Datos de sesión:", datosSesion);
    const fraseMotivacional = document.getElementById("fraseMotivacional");
    fraseMotivacional.textContent =
        frasesMotivacionales[Math.floor(Math.random() * frasesMotivacionales.length)];
    nombreUsuario = datosSesion?.nombre?.split(" ")[0] || "Usuario";
    document.getElementById("nombre-usuario").textContent = nombreUsuario;

    // Puedes añadir datos reales si los recuperas de la sesión:
    document.getElementById("num-entradas").textContent =
        datosSesion?.n_registros || 0;
    document.getElementById("num-rutinas").textContent =
        datosSesion?.n_rutinas || 0;
    document.getElementById("num-amigos").textContent =
        datosSesion?.n_amigos || 0;
});