import ProductModel from "../models/products.model.js";
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

class ProductController {
    constructor() {
        this.productModel = new ProductModel();
    }

    /**
    * function to add new products
    * @param {*} req 
    * @param {*} res 
    * @returns 
    */
    async addProduct(req, res) {
        const { product_name, price, image, description, category, rating, stock, specs } = req.body;
        if (!product_name || !price || !image || !description || !category || !rating || !stock || !specs) {
            return res.status(400).json({ message: "All fields are required" });
        }
        try {
            const result = await this.productModel.createProduct(product_name, price, image, description, category, rating, stock, specs);
            return res.status(201).json({ message: "Product added successfully", data: result.rows[0] });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    /**
    * function to find a product by id
    * @param {*} req 
    * @param {*} res 
    * @returns 
    */
    async findProductById(req, res) {
        const { id } = req.params;
        try {
            const result = await this.productModel.findProductById(id);
            return res.status(200).json({ message: "Product found successfully", data: result.rows[0] });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    /**
    * function to edit a product by id
    * @param {*} req 
    * @param {*} res 
    * @returns 
    */
    async editProduct(req, res) {
        const { id } = req.params;
        const { product_name, price, image, description, category, rating, stock, specs } = req.body;
        try {
            const result = await this.productModel.updateProductById(id, product_name, price, image, description, category, rating, stock, specs);
            return res.status(200).json({ message: "Product updated successfully", data: result.rows[0] });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    /**
    * function to delete a product by id
    * @param {*} req 
    * @param {*} res 
    * @returns 
    */
    async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            const result = await this.productModel.deleteProductById(id);
            return res.status(200).json({ message: "Product deleted successfully", data: result.rows[0] });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default ProductController;