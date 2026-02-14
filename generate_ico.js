const fs = require('fs');
const path = require('path');
const toIco = require('to-ico');

const pngPath = path.join(__dirname, 'assets', 'icon', 'logo.png');
const icoPath = path.join(__dirname, 'assets', 'icon', 'logo.ico');

const files = [fs.readFileSync(pngPath)];

toIco(files, {
    resize: true,
    sizes: [256, 128, 64, 48, 32, 24, 16] // Standard Windows ICO sizes
}).then(buf => {
    fs.writeFileSync(icoPath, buf);
    console.log(`Successfully generated ${icoPath}`);
}).catch(err => {
    console.error('Error creating ICO:', err);
    process.exit(1);
});
