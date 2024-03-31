import { db } from "../connection.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const addEvent = (req,res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "gjoretinolukasriste", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
        const q = "INSERT INTO Event (`creator_id`,`title`,`description`,`datetime`,`place`,`latitude`,`longitude`,`category`) VALUES (?) ";
        const values = [
            userInfo.id,
            req.body.title,
            req.body.description,
            req.body.date+"T"+req.body.time,
            req.body.place,
            req.body.latitude,
            req.body.longitude,
            "party"
        ]
        console.log(values);
        return db.query(q,[values], (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Event created");
        })
    });

}
export const getEvents = (req,res) =>{

    const upcoming = req.query.upcoming === 'true';
    //check whether we are fetching upcoming or trending posts TODO

    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "gjoretinolukasriste", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
        const q1 = "SELECT * FROM Event WHERE creator_id != ? AND datetime > NOW() ORDER BY datetime ASC";

        return db.query(q1,[userInfo.id], (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    })
}
export const getSingleEvent = (req,res) => {
    const q = "SELECT * FROM Event WHERE id = ?";
        return db.query(q,[req.query.eventId], (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json(data[0]);
        })
}