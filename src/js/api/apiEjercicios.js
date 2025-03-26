export async function insertarEjercicios(formData) {
    try {
        // Convertir los músculos seleccionados en una cadena JSON
        const musculos = formData.getAll("musculos[]");
        formData.delete("musculos[]"); 
        formData.append("musculos", JSON.stringify(musculos));

        const response = await fetch('http://localhost/php-fitme/insertarEjercicio.php', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error al insertar el ejercicio:", error);
    }
}


export async function getMusculos(){
    try {
        const response = await fetch('http://localhost/php-fitme/getMusculos.php');
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
    }
}