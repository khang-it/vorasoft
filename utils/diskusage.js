const diskusage = require('diskusage');
const os = require('os');

const drive = os.platform() === 'win32' ? 'C:' : '/';

// diskusage.check(drive, async (err, info) => {
//     if (err) {
//         console.error('Error getting disk usage:', err);
//         return;
//     }
//     return new Promise((resolve) => resolve(info));
// });

module.exports = {
    diskusage: () => {
        return new Promise((resolve) => {
            diskusage.check(drive, async (err, info) => {
                if (err) {
                    console.error('Error getting disk usage:', err);
                    return;
                }
                resolve(info);
            })
        });
    }

};