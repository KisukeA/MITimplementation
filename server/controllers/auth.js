import { db } from "../connection.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const login = (req,res) =>{

    //secret key used for creating the cookie
    const secretKey = "gjoretinolukasriste";
    //fetch whatever else we need, like locaion name etc...
    const q = "SELECT id, username, password, role FROM User WHERE username = ?"
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.status(500).json(err)
        if(!data.length) return res.status(404).json("User not found")

        const checkPass = bcrypt.compareSync(req.body.password, data[0].password)
        if(!checkPass) return res.status(400).json("Incorrect password or username");
        // if the password is correct we create a cookie, we sign the id of the current user with our secret key
        const token = jwt.sign({id:data[0].id}, secretKey);
        //we dont include the password of course
        res.cookie("token",token,{
            httpOnly:true,
        }).status(200).json(data[0]);
    }); 
}

export const logout = (req,res) =>{
    return res.clearCookie("token",{
        httpOnly:true,
    }).status(200).json("User has been logged out")
}

export const register = (req,res) =>{
    //simple authentication with hashing and salting of the password 
    const q = "SELECT * FROM User WHERE username = ?"
    db.query(q,[req.body.username], (err,data)=>{
        if(err) return res.status(500).json(err)
        if(data.length) {return res.status(409).json("User already exists")}
        else{
            if(req.body.password != req.body.confirm){return res.status(400).json("Passwords do not match")}
            
            //hashing password
            const salt = bcrypt.genSaltSync(10);
            const hashedPass = bcrypt.hashSync(req.body.password, salt)
    
            const q1 = "INSERT INTO User (`username`, `password`, `role`) VALUES (?)"
            const values = [req.body.username, hashedPass, req.body.role]

            db.query(q1,[values], (err,data)=>{
                if(err) return res.status(500).json(err)
                else return res.status(200).json("User created")
            } )
        }
    })
}