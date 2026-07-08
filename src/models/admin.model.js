import pool from "../config/db.js"
import bcrypt from "bcrypt";

export function createAdmin(email, password) {
    /*
     * added 12 salt rounds to user inputed password before hashing
     */
    const saltRounds = 12;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const query = `INSERT INTO admins (email, password) VALUES ($1, $2)`;
    const values = [email, hashedPassword];
    return pool.query(query, values);
}

export function findAdminByEmail(email) {
    const query = `SELECT * FROM admins WHERE email = $1`;
    const values = [email];
    return pool.query(query, values);
}

export function deleteAdmin(id) {
    const query = `DELETE FROM admins WHERE id = $1`;
    const values = [id];
    return pool.query(query, values);
}