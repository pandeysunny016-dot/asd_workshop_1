const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '..', 'db.json');

async function readAll() {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

async function writeAll(data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readAll, writeAll };
