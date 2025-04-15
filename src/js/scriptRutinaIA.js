document.getElementById('form-rutinaIA').addEventListener('submit', function (e) {
    e.preventDefault();

    const sexo = document.getElementById('sexo').value;
    const fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
    const experiencia = document.getElementById('experiencia').value;
    const objetivo = document.getElementById('objetivo').value;
    const dias_entreno = parseInt(document.getElementById('dias_entreno').value);

    const datos = {
        sexo,
        fecha_nacimiento,
        experiencia,
        objetivo,
        dias_entreno
    };

    fetch('/api/generarRutina.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(res => res.json())
    .then(respuesta => {
        console.log("Rutina generada:", respuesta);
        // Aquí puedes redirigir o mostrar la rutina en pantalla
    })
    .catch(err => {
        console.error("Error generando rutina:", err);
    });
});
