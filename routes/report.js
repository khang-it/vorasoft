const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Render report page
router.get('/', (req, res) => {
    res.render('report');
});

// Generate PDF from HTML
router.post('/generate', async (req, res) => {
    const { reportContent } = req.body; // Nội dung HTML cần xuất
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.setContent(reportContent);
        const pdf = await page.pdf({ format: 'A4' });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
        res.send(pdf);
    } catch (err) {
        res.status(500).send('Error generating PDF');
    } finally {
        await browser.close();
    }
});

module.exports = router;
