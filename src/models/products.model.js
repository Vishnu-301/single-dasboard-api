import pool from "../config/db.js";

class ProductModel {
    product_name;
    price;
    image;
    description;
    category;
    rating;
    stock;
    specs;
    created_at;

    constructor(product_name, price, image, description, category, rating, stock, specs) {
        this.product_name = product_name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.category = category;
        this.rating = rating;
        this.stock = stock;
        this.specs = specs;
    }

    /**
     * create product
     */

    async createProduct() {
        const query = `INSERT INTO products (product_name, price, image, description, category, rating, stock, specs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
        const values = [this.product_name, this.price, this.image, this.description, this.category, this.rating, this.stock, this.specs];
        const result = await pool.query(query, values);
        return result;
    }

    /**
     * find product by name
     */
    async findProductByName(name) {
        const query = `SELECT * FROM products WHERE product_name = $1`;
        const values = [name];
        const result = await pool.query(query, values);
        return result;
    }

    async findProductById(id) {
        const query = `SELECT * FROM products WHERE id = $1`;
        const values = [id];
        const result = await pool.query(query, values);
        return result;
    }

    async updateProductById(id, product_name, price, image, description, category, rating, stock, specs) {
        const query = `UPDATE products SET product_name = $1, price = $2, image = $3, description = $4, category = $5, rating = $6, stock = $7, specs = $8 WHERE id = $9`;
        const values = [product_name, price, image, description, category, rating, stock, specs, id];
        const result = await pool.query(query, values);
        return result;
    }

    /**
     * delete product by name
     */
    async deleteProductByName(name) {
        const query = `DELETE FROM products WHERE product_name = $1`;
        const values = [name];
        const result = await pool.query(query, values);
        return result;
    }
}

export default ProductModel;