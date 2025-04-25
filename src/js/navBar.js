import { getFotoPerfilBase64 } from "./api/apiEjercicios";
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

document.addEventListener('DOMContentLoaded', async () => {
    const datosSesionJSON = sessionStorage.getItem('usuario');
    const datosSesion = JSON.parse(datosSesionJSON);
    const imgPerfilUsr = document.getElementById('user-icon');
    try {
        const fotoPerfilBase64 = await getFotoPerfilBase64(datosSesion.id);
        imgPerfilUsr.src = fotoPerfilBase64 ? `data:image/png;base64,${fotoPerfilBase64}` : '/src/assets/user-icon.png';
    } catch (error) {
        console.error("Error al obtener la foto de perfil:", error);
        imgPerfilUsr.src = '/src/assets/user-icon.png';
    }
});

if (menuToggle && navigation) {
    menuToggle.addEventListener("click", function () {
        navigation.classList.toggle("open");
    });
    document.addEventListener("click", function (event) {
        if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) {
            navigation.classList.remove("open");
        }
    });
}