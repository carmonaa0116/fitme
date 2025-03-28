const mainRutinaIA = document.getElementById("main-rutinaIA");
document.addEventListener("DOMContentLoaded", async () => {
    console.log(mainRutinaIA);
    generarFormularioInicio();
});

function generarFormularioInicio(){
    mainRutinaIA.innerHTML = '';
    mainRutinaIA.innerHTML = `
        <div id="div-rutinaIA">
            <form id="form-rutinaIA">
                
            </form>
        </div>
    `;
}

