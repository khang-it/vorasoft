const socketIo = require('socket.io');
const getServerStats = require('../utils/server-stats');
module.exports = (server) => {
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('Client connected');

        const interval = setInterval(async () => {
            const stats = await getServerStats();
            socket.emit('server-stats', stats);
        }, 1500);

        socket.on('disconnect', () => {
            clearInterval(interval);
            console.log('Client disconnected');
        });
    });

    return io;
};