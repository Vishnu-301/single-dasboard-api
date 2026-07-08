import {
    createAdmin,
    findAdminByEmail,
    deleteAdmin
} from "../models/admin.model.js"

class Admin {
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
        const { email, password } = req.body
        try {
            if (email && password){
                const result = await createAdmin(email, password);
            }
        } catch (error) {
            console.error(error)
            res
            .status(500)
            .json({
                message: "internal server error"
            })
        }
    }

    async login(){
        try {
            
        } catch (error) {
            
        }
    }

}