import productService from "../services/productService";

const fetchAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        console.error('Failed to fetch products:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default { fetchAllProducts }
