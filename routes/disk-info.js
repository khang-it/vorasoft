const express = require('express');
const router = express.Router();

const { broadcastDiskInfo, getDiskInfo } = require('../services/disk-service');

// const io = {};

let lastDiskInfo = [];

router.get('/disk-info', async (req, res) => {
    try {
        const disks = await getDiskInfo();
        //console.log('disks:', disks)
        lastDiskInfo = disks?.map(disk => ({
            ...disk,
            readSpeed: Math.random() * 100,
            writeSpeed: Math.random() * 100,
        }));
        res.json(lastDiskInfo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve disk info' });
    }
});

// router.get('/broadcast', async (req, res) => {
//     try {
//         await broadcastDiskInfo();
//         res.json({ message: 'Disk info broadcasted' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to broadcast disk info' });
//     }
// });

module.exports = router;