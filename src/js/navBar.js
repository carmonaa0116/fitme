import { getFotoPerfilBase64 } from "./api/apiEjercicios";
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");


document.addEventListener('DOMContentLoaded', async () => {
    const datosSesionJSON = sessionStorage.getItem('usuario');
    const datosSesion = JSON.parse(datosSesionJSON)
    console.log(datosSesion)
    const fotoPerfilBase64 = await getFotoPerfilBase64(datosSesion.id)
    const imgPerfilUsr = document.getElementById('user-icon');
    console.log(imgPerfilUsr.src + fotoPerfilBase64)
    imgPerfilUsr.src = imgPerfilUsr.src + fotoPerfilBase64;
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