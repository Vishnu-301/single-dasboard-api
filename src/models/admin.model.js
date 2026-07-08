import pool from "../config/db.js"

export function createAdmin() {
    const query = `INSERT INTO admins (email, password) VALUES ($1, $2)`;
    const values = [email, password];
    return pool.query(query, values);
}

export function findAdminByEmail(email){
    const query = `SELECT * FROM admins WHERE email = $1`;
    const values = [email];
    return pool.query(query, values);
}

export function deleteAdmin(id){
    const query = `DELETE FROM admins WHERE id = $1`;
    const values = [id];
    return pool.query(query, values);
}