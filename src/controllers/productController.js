const { Product } = require('../model');

async function createProduct(req, res) {
    const { name, price } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({ error: 'A non-empty product name is required.' });
    }

    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
        return res.status(400).json({ error: 'A valid non-negative price is required.' });
    }

    try {
        const product = await Product.create({
            name: name.trim(),
            price: parsedPrice,
        });

        return res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        return res.status(500).json({ error: 'Failed to create product.' });
    }
}

async function getProducts(req, res) {
    try {
        const products = await Product.findAll({
            order: [['id', 'ASC']],
        });

        return res.json(products);
    } catch (error) {
        console.error('Error listing products:', error);
        return res.status(500).json({ error: 'Failed to list products.' });
    }
}

async function patchProduct(req, res) {
    const { productId } = req.params;

    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        const updates = {};

        if (req.body.name !== undefined) {
            if (typeof req.body.name !== 'string' || !req.body.name.trim()) {
                return res.status(400).json({ error: 'A non-empty product name is required.' });
            }

            updates.name = req.body.name.trim();
        }

        if (req.body.price !== undefined) {
            const parsedPrice = Number(req.body.price);
            if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
                return res.status(400).json({ error: 'A valid non-negative price is required.' });
            }

            updates.price = parsedPrice;
        }

        await product.update(updates);

        return res.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({ error: 'Failed to update product.' });
    }
}

async function deleteProduct(req, res) {
    const { productId } = req.params;

    try {
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        await product.destroy();

        return res.json({ message: 'Product deleted successfully.' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ error: 'Failed to delete product.' });
    }
}

module.exports = {
    createProduct,
    getProducts,
    patchProduct,
    deleteProduct,
};
