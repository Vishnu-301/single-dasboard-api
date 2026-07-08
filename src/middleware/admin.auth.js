import express from "express";

export async function isAuth(req, res, next){
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400).json({
            message: "All credentials are required"
        });
    }

    next();
}