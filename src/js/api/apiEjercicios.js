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

export async function getMusculos() {
    try {
        const response = await fetch('http://localhost/php-fitme/getMusculos.php');

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error al obtener los músculos:", error);
    }
}

export async function editarEjercicio(id, nombre, imagen, video, musculos) {
    try {
        const response = await fetch('http://localhost/php-fitme/editarEjercicio.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, nombre, imagen, video, musculos })
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error al editar el ejercicio:", error);
    }
}

export async function getTodosDatosEjercicios() {
    try {
        const response = await fetch('http://localhost/php-fitme/getTodosDatosEjercicios.php');

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const responseText = await response.text();  // Obtener como texto primero
        let data;

        try {
            data = JSON.parse(responseText);  // Intentar convertirlo a JSON
        } catch (jsonError) {
            throw new Error("La respuesta del servidor no es un JSON válido.");
        }

        if (data.error) console.error(data.error);
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error al obtener los datos de los ejercicios:", error);
    }
}


export async function getMusculosEjercicio(idEjercicio) {
    try {
        const response = await fetch('http://localhost/php-fitme/getMusculosEjercicio.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idEjercicio })
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {

    }
}

export async function eliminarEjercicio(id) {
    try {
        const response = await fetch('http://localhost/php-fitme/eliminarEjercicio.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error al eliminar el ejercicio:", error);
    }
}

export async function comprobarUsuario(nombre_usuario) {
    try {
        const response = await fetch('http://localhost/php-fitme/comprobarUsrRegister.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre_usuario: nombre_usuario })
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();

        // Manejar la respuesta JSON
        if (data.mensaje) {
            if (data.usuario_existe) {
                console.log("El usuario ya existe");
            } else {
                console.log("El usuario está disponible");
            }
        } else {
            console.log("Hubo un error en la respuesta del servidor");
        }

        return data;
    } catch (error) {
        console.error("Error en la función comprobarUsuario:", error);
    }
}


export async function login(nombre_usuario, contrasena) {
    // Validación de los campos
    if (!nombre_usuario || !contrasena) {
        throw new Error("Por favor, ingresa nombre de usuario y contraseña.");
    }

    const datos = {
        nombre_usuario: nombre_usuario,
        contrasena: contrasena
    };

    try {
        // Realizar la solicitud al servidor
        const respuesta = await fetch('http://localhost/php-fitme/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if (resultado.mensaje) {
            return resultado.usuario; // Retorna los datos del usuario en caso de éxito
        } else {
            throw new Error(resultado.error); // Lanza el error que el servidor devuelve
        }
    } catch (error) {
        console.error('Error en la solicitud de login:', error);
        throw new Error("Hubo un problema al intentar iniciar sesión. Inténtalo de nuevo más tarde.");
    }
}

export async function getRutinasUser(idUsuario) {
    try {
        const response = await fetch(`http://localhost/php-fitme/getRutinasUser.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_usuario: idUsuario })
        });

        if (!response.ok) {
            throw new Error("Error al obtener las rutinas");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return []; // Devolver un array vacío en caso de error
    }
}
export async function registrar(datos) {
    try {
        const response = await fetch('http://localhost/php-fitme/registro.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return { error: 'No se pudo registrar el usuario. Inténtalo más tarde.' };
    }
}
