const diskusage = require('diskusage');
const os = require('os');

const drive = os.platform() === 'win32' ? 'C:' : '/'; // Kiểm tra hệ điều hành, dùng 'C:' cho Windows, '/' cho Linux/macOS

diskusage.check(drive, async (err, info) => {
    if (err) {
        console.error('Error getting disk usage:', err);
        return;
    }

    // console.log('Free space:', info.free); // Dung lượng còn trống
    // console.log('Total space:', info.total); // Tổng dung lượng
    // console.log('Used space:', info.used); // Dung lượng đã sử dụng
    console.log('Disk info:', drive, info);
    // return info;

    return new Promise((resolve) => resolve(info));

});

module.exports = {
    diskusage: () => {
        return new Promise((resolve) => {
            diskusage.check(drive, async (err, info) => {
                if (err) {
                    console.error('Error getting disk usage:', err);
                    return;
                }

                // console.log('Free space:', info.free); // Dung lượng còn trống
                // console.log('Total space:', info.total); // Tổng dung lượng
                // console.log('Used space:', info.used); // Dung lượng đã sử dụng
                console.log('Disk info:', drive, info);
                // return info;

                resolve(info);

            })
        });
    }

};