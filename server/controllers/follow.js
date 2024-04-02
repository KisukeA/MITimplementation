import { db } from "../connection.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const addFollow = (req,res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "gjoretinolukasriste", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
        const q = "INSERT INTO Following (`follower_id`,`followed_id`) VALUES (?) ";
        const values = [
            userInfo.id,
            req.body.followed_id,
        ]
        console.log(values);
        return db.query(q,[values], (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Followship added");
        })
    });
}
export const deleteFollow = (req,res) => {
    const token = req.cookies.token
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "gjoretinolukasriste", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "DELETE FROM Following WHERE `follower_id` = ? AND `followed_id` = ?";
        return db.query(q,[userInfo.id,req.params.followed], (err,data)=>{
            if(err) return res.status(500).json(err);
            if(data.affectedRows>0) return res.status(200).json("Followship deleted");
            return res.status(403).json("Cannot delete that follow");
        })
    });

}
export const getFollowers = (req,res) =>{

    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "gjoretinolukasriste", (err, userInfo) => {
        const q = `SELECT (SELECT COUNT(*) FROM Following WHERE followed_id = ?) AS followers,
        (SELECT COUNT(*) FROM Following WHERE follower_id = ?) AS following`;
        return db.query(q,[userInfo.id, userInfo.id],(err,data)=>{
            if(err) return res.status(500).json(err)
            if(data.length === 0) return res.status(404).json("User not found");
            return res.status(200).json(data[0]);
        });
    })
}