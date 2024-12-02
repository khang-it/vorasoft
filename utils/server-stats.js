const os = require('os');
const osUtils = require('os-utils');

function getServerStats() {
    const interfaces = os.networkInterfaces();
    const region = os.hostname();

    const networkInfo = Object.keys(interfaces).reduce((acc, iface) => {
        const addresses = interfaces[iface].filter(addr => addr.family === 'IPv4' && !addr.internal);
        addresses.forEach(addr => {
            acc.push({ interface: iface, address: addr.address });
        });
        return acc;
    }, []);

    return new Promise((resolve) => {
        osUtils.cpuUsage((cpuUsage) => {
            resolve({
                cpuUsage: cpuUsage * 100, // CPU sử dụng (%)
                freeMem: os.freemem() / 1024 / 1024, // RAM còn trống (MB)
                totalMem: os.totalmem() / 1024 / 1024, // Tổng RAM (MB)
                loadAvg: os.loadavg(), // Load trung bình trong 1, 5, 15 phút
                uptime: os.uptime(), // Thời gian uptime (giây)
                region,
                network: networkInfo,
            });
        });
    });
}

module.exports = getServerStats;
