import productModel from "../models/productModel.js";
import fs from 'fs'

export const createProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.fields;
        const { image } = req.files;
        if (!name || !price || !description || !category || !image) {
            return res.status(400).json({ msg: "Please fill in all fields" });
        }

        const newProduct = new productModel({
            name,
            price,
            description,
            category,
        });

        // Read the image file as a buffer
        const imageBuffer = fs.readFileSync(image.path);

        // Convert the image buffer to a base64-encoded string
        const imageBase64 = imageBuffer.toString('base64');

        // Save the base64-encoded image data and content type
        newProduct.image.data = imageBase64;
        newProduct.image.contentType = image.type;

        await newProduct.save();
        fs.unlinkSync(image.path);

        return res.status(201).json({ msg: "Product created successfully", newProduct }); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });        
    }
}


export const getProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        return res.status(200).json({ msg: "Products fetched successfully", products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
}

export const getOneProducts = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        return res.status(200).json({ msg: "Product fetched successfully", product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
}


export const deleteproduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ msg: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.fields;
        const { image } = req.files;
        const productId = req.params.id;
        let product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }
        if (name) product.name = name;
        if (price) product.price = price;
        if (description) product.description = description;
        if (category) product.category = category;
        if (image) {
            const path = image.path.split('\\');
            product.image.data = fs.readFileSync(image.path);
            product.image.contentType = image.type;
            fs.unlinkSync(image.path);
            product.image.path = path[path.length - 1];
        }
        await product.save();

        return res.status(200).json({ msg: "Product updated successfully", product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
}
