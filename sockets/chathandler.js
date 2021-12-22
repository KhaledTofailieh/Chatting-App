
const { sockets } = require('../caches/index')

module.exports = (io, socket) => {
    socket.on('chat message', msg => {
        console.log(msg)
        io.sockets.to(socket.id).emit('chat message', msg.content)
        if (sockets[msg.to]) {
            io.sockets.to(sockets[msg.to]).emit('chat message', msg.content)
        }else{
            //put in 'msg.to' mail
        }
    });

    socket.on('client message', (msg) => {
        console.log('message send', msg)
    })
}