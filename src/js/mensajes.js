import { obtenerAmigos, manejarNuevoChat, obtenerAmigosSinChat, getChats } from './api/apiEjercicios.js';

document.addEventListener('DOMContentLoaded', async () => {
    const amigos = await obtenerAmigosSinChat();
    configurarBotonNuevoChat(amigos);
    console.log('Amigos cargados correctamente.');
    const chats = await getChats();
    console.log('Chats cargados correctamente.');
    configurarNuevosChats(chats);
});

function configurarNuevosChats(chats) {
    const userList = document.getElementById("user-list");
    userList.innerHTML = '';
    if (chats.length === 0) {
        const noChatsMessage = document.createElement('p');
        noChatsMessage.textContent = 'No tienes chats todavía.';
        userList.appendChild(noChatsMessage);
        return;
    }
    chats.forEach((chat) => {
        console.log(chat)
        console.log(chat.usuario.nombre_usuario)
        const userItem = document.createElement('div');
        userItem.classList.add('user-item');
        let fotoPerfil = chat.usuario.foto_perfil
            ? `data:image/png;base64,${chat.usuario.foto_perfil}`
            : '/src/assets/user-icon.png';
        userItem.innerHTML = `
            <img class="user-avatar" src="${fotoPerfil}" alt="Avatar de ${chat.usuario.nombre_usuario}" />
            <div class="user-info">
                <p>${chat.usuario.nombre_usuario}</p>
            </div>
        `;
        userItem.addEventListener('click', () => {
            console.log(`Iniciando chat con ${chat.usuario.nombre_usuario}`);
            manejarNuevoChat(chat.usuario.id);
            window.location = '/Chat?id=' + chat.usuario.id;
        });
        userList.appendChild(userItem);
    });
}


function configurarBotonNuevoChat(amigos) {
    const newChatButton = document.getElementById("new-chat-button");
    const friendListDialog = document.getElementById("friend-list-dialog");

    newChatButton.addEventListener("click", () => {
        mostrarDialogoAmigos(friendListDialog, amigos);
    });

    friendListDialog.addEventListener("close", () => {
        console.log("Dialog cerrado");
    });
}

function mostrarDialogoAmigos(dialogo, amigos) {
    dialogo.innerHTML = ''; // Limpiar contenido del diálogo

    const titulo = document.createElement('h3');
    titulo.textContent = 'Selecciona un amigo para chatear';
    dialogo.appendChild(titulo);

    // Botón de cerrar en la esquina superior derecha
    const closeDialogButton = document.createElement('button');
    closeDialogButton.id = "close-dialog-button";
    closeDialogButton.textContent = "×";
    closeDialogButton.style.position = "absolute";
    closeDialogButton.style.top = "10px";
    closeDialogButton.style.right = "10px";
    closeDialogButton.style.fontSize = "1.5rem";
    closeDialogButton.style.background = "transparent";
    closeDialogButton.style.border = "none";
    closeDialogButton.style.cursor = "pointer";
    closeDialogButton.setAttribute("aria-label", "Cerrar");
    closeDialogButton.addEventListener("click", () => {
        dialogo.close();
    });
    dialogo.appendChild(closeDialogButton);

    if (amigos.length === 0) {
        const noFriendsMessage = document.createElement('p');
        noFriendsMessage.textContent = 'No tienes amigos para chatear.';
        dialogo.appendChild(noFriendsMessage);

        const buscarAmigosBtn = document.createElement('button');
        buscarAmigosBtn.style.marginRight = "1dvw"
        buscarAmigosBtn.textContent = 'Buscar amigos';
        buscarAmigosBtn.addEventListener('click', () => {
            window.location = '/Usuarios';
        });
        dialogo.appendChild(buscarAmigosBtn);
    } else {
        amigos.forEach(amigo => {
            let fotoPerfil = amigo.foto_perfil
                ? `data:image/png;base64,${amigo.foto_perfil}`
                : '/src/assets/user-icon.png';

            const userItem = document.createElement('div');
            userItem.classList.add('user-item');
            userItem.innerHTML = `
            <img class="user-avatar" src="${fotoPerfil}" alt="Avatar de ${amigo.nombre_usuario}" />
            <div class="user-info">
                <p>${amigo.nombre_usuario}</p>
            </div>
        `;

            userItem.addEventListener('click', () => {
                console.log(`Iniciando chat con ${amigo.nombre_usuario}`);
                manejarNuevoChat(amigo.id);
                dialogo.close();
                window.location = '/Chat?id=' + amigo.id;
            });

            dialogo.appendChild(userItem);
        });
    }

    // Botón "Cerrar" abajo a la derecha
    const cerrarAbajoBtn = document.createElement('button');
    cerrarAbajoBtn.textContent = 'Cerrar';

    cerrarAbajoBtn.addEventListener('click', () => {
        dialogo.close();
    });
    dialogo.appendChild(cerrarAbajoBtn);

    dialogo.showModal();
}