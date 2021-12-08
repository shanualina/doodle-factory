const Product = require('../models/products');


const addProduct = async (req, res, next) => {
    try {
        const data = req.body;
        data.images = req.files.map(file => file.filename);
        const product = await new Product(data).save();
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
}

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({
            deletedAt: {
                $eq: null
            }
        });
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}


const getShopProducts = async (req, res, next) => {
    const options = {
        deletedAt: {
            $eq: null
        }
    };

    if (req.body.ids) {
        options._id = req.body.ids;
    }

    try {
        let products = await Product.find(options);

        products = products.map((product) => {
            return {
                id: product._id,
                title: product.title,
                description: product.description,
                price: product.price,
                images: product.images.map((image) => `/uploads/${image}`)
            }
        });

        res.status(200).json(products);
    } catch(error) {
        next(error);
    }
}


const updateProduct = async (req, res, next) => {
    const _id = req.params.id;
    const data = req.body;
    // data.images = [...data.images, ...data.new_images];

    try {
        const product = await Product.findOneAndUpdate({ _id }, data);
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

const deleteProduct = async (req, res, next) => {
    const _id = req.params.id;

    try {
        const product = await Product.findOneAndUpdate({ _id }, {
            deletedAt: Date.now()
        });
        res.status(204).json(product);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getShopProducts
}
