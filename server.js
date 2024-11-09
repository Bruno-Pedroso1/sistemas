const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 4000 });

const usuarios = [];

server.on('connection', (ws) => {
    console.log('Novo usuário conectado');
    usuarios.push(ws);

    ws.send(JSON.stringify({
        type: 'notification',
        message: 'Você está conectado ao servidor!'
    }));

    usuarios.forEach(usuario => {
        if (usuario !== ws && usuario.readyState === WebSocket.OPEN) {
            usuario.send(JSON.stringify({
                type: 'notification',
                message: 'Alguém se conectou!'
            }));
        }
    });

    ws.on('message', (message) => {
        console.log(`Mensagem recebida: ${message}`);


        usuarios.forEach(usuario => {
            if (usuario !== ws && usuario.readyState === WebSocket.OPEN) {
                usuario.send(JSON.stringify({
                    type: 'message',
                    message: message
                }));
            }
        });
    });

    ws.on('close', () => {
        console.log('Usuário desconectado');
        const index = usuarios.indexOf(ws);
        if (index > -1) usuarios.splice(index, 1);

        usuarios.forEach(usuario => {
            if (usuario !== ws && usuario.readyState === WebSocket.OPEN) {
                usuario.send(JSON.stringify({
                    type: 'notification',
                    message: 'Um usuário se desconectou.'
                }));
            }
        });
    });
});

console.log('Servidor WebSocket rodando na porta 4000');
