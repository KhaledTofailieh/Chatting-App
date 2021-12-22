
const chathandler = require('./chathandler.js')
const { online , sockets } = require('../caches/index')
const { users_controller } = require('../controllers/index')
module.exports = (io) => {
    io.on('connection',(socket) => {
        console.log(socket.handshake.query.token+" connected")
        sockets[socket.handshake.query.token] = socket.id
        online[socket.id] = socket.handshake.query.token 

        io.sockets.to(socket.id).emit('chat message', "start chatting now!")

        chathandler(io, socket)

        socket.on('disconnect',() => {
            const phone = online[socket.id]
            console.log("user: " + phone + " has exited")
            
            users_controller.close(phone)
            io.sockets.to(sockets["0937759046"]).emit('chat message', "صاحبك سكر و تركك")
            delete sockets[phone]
            delete online[socket.id]
            socket.leave()
        })
    })
}