const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');

user.post("/signin",async (res,req,next)=>{
    const {user_name, user_mail, user_password} = req.body;
    if(user_name && user_name && user_password){
        let query = "INSERT INTO user(user_name,user_mail,user_password) ";
        query+=`VALUES('${user_name}','${user_name}','${user_password}')`;
        const rows = await db.query(query);
        if(rows.affectedRows == 1){
            return res.status(201).json({code:201, message:"registro correcto"});
        }
        return res.status(500).json({code:500, message:" error"});
    }
    return res.status(500).json({code:500, message:" campos incompletos"});
});
user.post("/login",async(res,req,next)=>{
    const {user_mail, user_password}=req.body;
    const query = `SELECT * FROM user WHERE user_mail='${user_mail}' AND user_password='${user_password}';`;
    const rows = await db.query(query);

    if(user_mail && user_password){
        if(rows.length== 1){
            const token = jwt.sign({
                user_id : rows[0].user_id,
                user_mail : rows[0].user_mail
            }, "debugkey");
            return res.status(200).json({code:200, message: token})
        }else{
            return res.status(200).json({code:200, message: "usuario o contraseña incorrectos"})
        }
    }
    return res.status(500).json({code:500, message: "campos incompletos"})
});
user.get("/", async (res,req,next)=>{
    const query = "SELECT * FROM user";
    const rows = await db.query(query);
    return res.status(200).json({code:200, message: rows});
});

module.exports = user;