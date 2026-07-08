import {
    createAdmin,
    findAdminByEmail,
    deleteAdmin
} from "../models/admin.model.js"

export class Admin {
    email;
    password;

    __constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    /**
     * register the admin
     * @param {void} email 
     * @param {void} password 
     */
    async registerAdmin(email, password) {
        this.email = email;
        this.password = password;
        try {
            if (email && password) {
                const result = await createAdmin(email, password);
                return result;
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

    async login(email, password) {
        this.email = email;
        this.password = password;
        try {
            const findAdmin = findAdminByEmail(email);
            if (findAdmin ){
                const hashedPassword = await pool.query(`SELECT password FROM admins WHERE email= ${email}`);
                const veriefiedPassword = bycrypt.compare(password, hashedPassword) ? true : false;
                return veriefiedPassword;
            }
        } catch (error) {
            console.error(error)
            res.status(500)
                .json({
                    massege: "internal error or invalid inputs"
                });
        }
    }

}