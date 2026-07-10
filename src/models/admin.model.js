import pool from "../config/db.js";
import bcrypt from "bcrypt";

class AdminModel {
    email;
    password;

    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    /**
     * create admin
     */
    async createAdmin() {
        const saltRounds = 12;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(this.password, salt);

        const query = `INSERT INTO admins (email, password) VALUES ($1, $2) RETURNING id, email, created_at`;
        const values = [this.email, hashedPassword];
        return pool.query(query, values);
    }

    /**
     * find admin by email
     */
    static async findAdminByEmail(email) {
        const query = `SELECT * FROM admins WHERE email = $1`;
        const values = [email];
        return pool.query(query, values);
    }

    /**
     * delete admin by id
     */
    static async deleteAdmin(id) {
        const query = `DELETE FROM admins WHERE id = $1`;
        const values = [id];
        return pool.query(query, values);
    }
}

export default AdminModel;