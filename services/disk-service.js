const { getSocketIo } = require('../sockets/index');
const { getDiskInfo } = require('node-disk-info');

async function broadcastDiskInfo() {
    try {
        const disks = await getDiskInfo();
        const socket = getSocketIo();

        //console.log('disk-info:', disks);

        const interval = setInterval(async () => {
            console.log(disks)
            socket.emit('disk-info', disks);
        }, 1500);

        socket.on('disconnect', () => {
            clearInterval(interval);
            // console.log('Client disconnected');
        });

        //   console.log('Disk info broadcasted to clients');
    } catch (error) {
        console.error('Error broadcasting disk info:', error);
    }
}

module.exports = { broadcastDiskInfo, getDiskInfo };