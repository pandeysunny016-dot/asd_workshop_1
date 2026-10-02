const service = require('../services/productService');
const { invalidateCache } = require('../middleware/cache');

async function getAllProducts(req, res) {
    const products = await service.getAllProducts();
    res.json(products);
}

async function getProductById(req, res) {
    const product = await service.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
}

async function createProduct(req, res) {
    const product = await service.createProduct(req.body);
    invalidateCache();
    res.status(201).json(product);
}

async function updateProduct(req, res) {
    const product = await service.updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    invalidateCache();
    res.json(product);
}

async function patchProduct(req, res) {
    const product = await service.patchProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    invalidateCache();
    res.json(product);
}

async function deleteProduct(req, res) {
    const product = await service.deleteProduct(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    invalidateCache();
    res.json({ message: 'Deleted', product });
}

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, patchProduct, deleteProduct };
