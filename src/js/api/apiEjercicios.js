export function getDatosSesion() {
    const usuarioJSON = sessionStorage.getItem("usuario");
    if (usuarioJSON) {
        return JSON.parse(usuarioJSON);
    } else {
        return null;
    }
}

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

export async function getResultadosBusquedaUsr(nombreUsr) {
    try {
        const response = await fetch('http://localhost/php-fitme/getResultadosBusquedaUsr.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombreUsr: nombreUsr })
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            return [];
        }

        return data.usuarios || [];
    } catch (error) {
        console.error("Error al obtener los resultados de búsqueda:", error);
        return [];
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

function getSessionUsuario() {
    const usuarioJSON = sessionStorage.getItem("usuario");
    if (usuarioJSON) {
        return JSON.parse(usuarioJSON);
    } else {
        return null;
    }
}

export async function insertarRutina(nombre, dias) {
    const usuarioJSON = getSessionUsuario();

    if (!usuarioJSON) {
        console.error("No hay usuario en la sesión.");
        return;
    }
    try {
        const response = await fetch('http://localhost/php-fitme/insertarRutina.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: nombre,
                dias: dias,
                id_usuario: usuarioJSON.id
            })
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error("Error al insertar la rutina:", error);
    }

}

export async function getIdEjercicio(nombreEjercicio) {
    try {
        const response = await fetch('http://localhost/php-fitme/getIdEjercicio.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombreEjercicio })
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error al obtener el ID del ejercicio:", error);
    }
}

export function isUsuarioActivo() {
    const usuario = sessionStorage.getItem("usuario");
    if (usuario === null) {
        window.location.href = "/";
        return false;
    }
    console.log('Bienvenido')
    return true;
}

export async function editarEjercicioRutinaDia(idRutina, dia_semana, idEjercicio, series, repeticionesInicio, repeticionesFin, peso) {
    try {
        const response = await fetch('http://localhost/php-fitme/editarEjercicioRutinaDia.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idRutina: idRutina,
                dia_semana: dia_semana,
                idEjercicio: idEjercicio,
                series: series,
                repeticionesInicio: repeticionesInicio,
                repeticionesFin: repeticionesFin,
                peso: peso
            })
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error al obtener el ID del ejercicio:", error);
    }
}

export async function deleteEjercicioRutinaDia(id_rutina, dia_semana, idEjercicio) {
    try {
        const response = await fetch('http://localhost/php-fitme/deleteEjercicioRutinaDia.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_rutina: id_rutina,
                dia_semana: dia_semana,
                idEjercicio: idEjercicio
            })
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error al eliminar el ejercicio de la rutina:", error);
    }
}

export async function getEjerciciosPorDia(idRutina, dia) {
    try {
        const response = await fetch('http://localhost/php-fitme/getEjerciciosRutinaDia.php', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idRutina: idRutina,
                dia_semana: dia
            })
        });

        if (!response.ok) {
            throw new Error("Error al obtener los ejercicios");
        }

        const data = await response.json();

        return data.ejercicios || [];
    } catch (error) {
        console.error("Error en getEjerciciosPorDia:", error);
        return [];
    }
}


export async function insertarEjercicioRutinaDia(idRutina, dia_semana, idEjercicio, series, repeticionesInicio, repeticionesFin, peso) {
    try {
        const response = await fetch('http://localhost/php-fitme/insertarEjercicioRutinaDia.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idRutina: idRutina,
                dia_semana: dia_semana,
                idEjercicio: idEjercicio,
                series: series,
                repeticionesInicio: repeticionesInicio,
                repeticionesFin: repeticionesFin,
                peso: peso
            })
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error al insertar el ejercicio en la rutina:", error);
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

export async function getFotoPerfilBase64(idUsuario) {
    try {
        const response = await fetch('http://localhost/php-fitme/getFotoPerfilUsuario.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idUsuario })
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            return null;
        }

        return data.foto_perfil; // Devuelve la foto de perfil en base64
    } catch (error) {
        console.error("Error al obtener la foto de perfil en base64:", error);
        return null;
    }
}

export async function actualizarUsuario(nombre_usuario, nombre, email, fecha_nacimiento, foto_perfil) {
    try {
        const editProfileForm = document.getElementById('editProfileForm');
        const formData = new FormData(editProfileForm);

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const response = await fetch('http://localhost/php-fitme/editarUsuario.php', {
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
        console.error("Error al actualizar el usuario:", error);
        return { error: 'No se pudo actualizar el usuario. Inténtalo más tarde.' };
    }
}

export async function manejarNuevoChat(user2_id) {
    const datosSesion = getDatosSesion();
    if (datosSesion) {
        const id_usuario = String(datosSesion.id);
        const id_amigo = String(user2_id);
        try {
            const response = await fetch('http://localhost/php-fitme/manejarNuevoChat.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user1_id: id_usuario, user2_id: id_amigo })
            });

            if (!response.ok) {
                throw new Error(`Error en la respuesta del servidor: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error al manejar el nuevo chat:", error);
            return null;
        }
    } else {
        console.error("No hay datos de sesión disponibles.");
        return null;
    }

}

export async function obtenerAmigos() {
    const datosSesion = getDatosSesion();
    try {
        const response = await fetch('http://localhost/php-fitme/getAmigos.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_usuario: datosSesion.id })
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error al obtener los amigos:", error);
        return [];
    }
}

export async function getChats() {
    const datosSesion = getDatosSesion();
    try {
        const response = await fetch('http://localhost/php-fitme/getChats.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_usuario: datosSesion.id })
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error al obtener los chats:", error);
        return [];
    }
}

export async function obtenerMensajes(id_usuario, id_amigo) {
    try {
        const res = await fetch("http://localhost/php-fitme/obtener_mensajes.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_usuario, id_amigo })
        });
        const datos = await res.json();
        return Array.isArray(datos) ? datos : [];
    } catch (error) {
        console.error("Error al obtener mensajes:", error);
        return [];
    }
}

export async function enviarMensaje(emisor_id, receptor_id, contenido) {
    try {
        const res = await fetch("http://localhost/php-fitme/enviar_mensaje.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ emisor_id, receptor_id, contenido })
        });

        const data = await res.json();
        return data.success === true;
    } catch (error) {
        console.error("Error al enviar el mensaje:", error);
        return false;
    }
}

  

export async function obtenerAmigosSinChat() {
    const datosSesion = getDatosSesion();
    try {
        const response = await fetch('http://localhost/php-fitme/getAmigosSinChat.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_usuario: datosSesion.id })
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error("Error al obtener los amigos:", error);
        return [];
    }
}

export async function cargarMensajes(idUsuario, idAmigo, contenedor) {
    try {
        const res = await fetch('http://localhost/php-fitme/obtener_mensajes.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_usuario: idUsuario, id_amigo: idAmigo })
        });

        if (!res.ok) {
            throw new Error(`Error en la respuesta del servidor: ${res.status}`);
        }

        const mensajes = await res.json();
        return mensajes;
    } catch (error) {
        console.error("Error al cargar los mensajes:", error);
    }
}

export async function cambiarEstadoSolicitud(id_solicitud, estado) {
    try {
        const response = await fetch('http://localhost/php-fitme/cambiarEstadoSolicitud.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_solicitud, estado })
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al cambiar el estado de la solicitud:", error);
    }
}

export async function cargarNotificaciones(id_destinatario) {
    try {
        const response = await fetch('http://localhost/php-fitme/getNotificaciones.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_destinatario: id_destinatario })
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al cargar notificaciones:", error);
        return null;
    }
}


export async function enviar_solicitud(id_usuario, id_usuario_solicitud) {
    try {
        const response = await fetch('http://localhost/php-fitme/enviarSolicitud.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_remitente: id_usuario, id_destinatario: id_usuario_solicitud })
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();
        if (data.error) {
            console.error(data.error);
            return null;
        }
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
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
        throw new Error(error.message || "Error en la solicitud de login");
    }
}

export async function registrar(datos) {
    console.log("Datos a registrar:", datos); // Verifica los datos que se envían
    try {
        const response = await fetch('http://localhost/php-fitme/registro.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uid: datos.uid,
                nombre_usuario: datos.nombre_usuario,
                nombre: datos.nombre,
                sexo: datos.sexo,
                fecha_nacimiento: datos.fecha_nacimiento,
                experiencia: datos.experiencia,
                altura: datos.altura,
                peso: datos.peso,
                email: datos.email,
            })
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

export async function comprobarUsuarioLogin(uid, email) {
    try {
        const response = await fetch('http://localhost/php-fitme/comprobarUsr.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uid })
        });

        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Verifica la respuesta del servidor
        // El PHP devuelve { found: true } o { found: false }
        return data.found;
    } catch (error) {
        console.error("Error al comprobar el usuario:", error);
        return false;
    }
}

export async function deleteRutina(idRecibido) {
    try {
        const response = await fetch(`http://localhost/php-fitme/deleteRutina.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: idRecibido }), // Cambia el cuerpo según tu API
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data); // Verifica la respuesta del servidor
            alert("Rutina eliminada correctamente.");
            window.location.href = "../index.html"; // Redirigir a la página principal
            return data;
        } else {
            alert("Error al eliminar la rutina.");
        }
    } catch (error) {
        console.error("Error al eliminar la rutina:", error);
    }
}

export async function getRutina(id) {
    try {
        const response = await fetch('http://localhost/php-fitme/getRutina.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });

        if (!response.ok) {
            throw new Error("Error al obtener la rutina");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return null; // Devolver null en caso de error
    }
}

export async function getDatosUsuarioUID(uid) {
    try {
        const response = await fetch('http://localhost/php-fitme/getDatosUsuarioUID.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ uid })
        });

        if (!response.ok) {
            throw new Error("Error al obtener los datos del usuario");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return null; // Devolver null en caso de error
    }
    
}

export async function getUnUsuario(idUsuario) {
    try {
        const response = await fetch('http://localhost/php-fitme/getUnUsuario.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_usuario: idUsuario })
        });

        if (!response.ok) {
            throw new Error("Error al obtener el usuario");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return null; // Devolver null en caso de error
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
