import {
    createAdmin,
    findAdminByEmail,
    deleteAdmin
} from "../models/admin.model.js"

import bcrypt from "bcrypt";

class Admin {
    email;
    password;

    __constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    /**
     * register the admin
     */
    async registerAdmin(req, res) {
        const { email, password } = req.body;
        try {
            if (email && password) {
                const result = await createAdmin(email, password);
                res
                    .status(201)
                    .json({
                        message: "Admin created successfully",
                        data: result.rows[0]  // extract the actual record
                    })
            } else {
                res.status(400).json({ message: "Email and password are required" });
            }
        } catch (error) {
            console.error(error)
            res
                .status(500)
                .json({
                    message: "internal server error"
                });
        }
    }

    /**
     * login the admin
     */
    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        try {
            const result = await findAdminByEmail(email);
            const admin = result.rows[0]; // actual record, or undefined

            if (!admin) {
                return res.status(404).json({ message: "Admin not found" });
            }

            // comparing hashed password to user input password
            const isMatch = await bcrypt.compare(password, admin.password);

            if (isMatch) {
                return res.status(200).json({
                    message: "Admin login successfully",
                    data: { id: admin.id, email: admin.email }
                });
            } else {
                return res.status(401).json({ message: "Invalid password" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal error or invalid inputs" });
        }
    }
}

export default Admin;