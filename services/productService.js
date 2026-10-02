const db = require('../database/db');

async function getAllProducts() {
    return db.readAll();
}

async function getProductById(id) {
    const products = await db.readAll();
    return products.find(p => p.id === Number(id)) || null;
}

async function createProduct(data) {
    const products = await db.readAll();
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const product = { id: newId, ...data };
    products.push(product);
    await db.writeAll(products);
    return product;
}

async function updateProduct(id, data) {
    const products = await db.readAll();
    const i = products.findIndex(p => p.id === Number(id));
    if (i === -1) return null;
    products[i] = { id: Number(id), ...data };
    await db.writeAll(products);
    return products[i];
}

async function patchProduct(id, data) {
    const products = await db.readAll();
    const i = products.findIndex(p => p.id === Number(id));
    if (i === -1) return null;
    products[i] = { ...products[i], ...data, id: Number(id) };
    await db.writeAll(products);
    return products[i];
}

async function deleteProduct(id) {
    const products = await db.readAll();
    const i = products.findIndex(p => p.id === Number(id));
    if (i === -1) return null;
    const [deleted] = products.splice(i, 1);
    await db.writeAll(products);
    return deleted;
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, patchProduct, deleteProduct };
