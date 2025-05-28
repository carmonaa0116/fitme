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
    chats.forEach((chat) => {
        console.log(chat)
        console.log(chat.usuario.nombre_usuario)
        const userItem = document.createElement('div');
        userItem.classList.add('user-item');
        let fotoPerfil = chat.foto_perfil
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

    const closeDialogButton = document.createElement('button');
    closeDialogButton.id = "close-dialog-button";
    closeDialogButton.textContent = "Cerrar";
    closeDialogButton.addEventListener("click", () => {
        dialogo.close();
    });

    dialogo.appendChild(closeDialogButton);
    dialogo.showModal();
}

