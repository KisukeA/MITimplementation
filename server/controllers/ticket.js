import { db } from "../connection.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const addTicket = (req,res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "gjoretinolukasriste", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
        const q = "INSERT INTO Ticket (`event_id`,`price`,`holder_id`,`event_creator_id`) VALUES (?) ";
        const values = [
            req.body.eventId,
            req.body.price,
            userInfo.id,
            req.body.eventCreator,
        ]
        console.log(values);
        return db.query(q,[values], (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Ticket added");
        })
    });
}

export const getGoing = (req,res) =>{

    const eventId = req.query.eventId;
    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "gjoretinolukasriste", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
        const q1 = "SELECT u.username, u.profile_picture FROM User u, Ticket t WHERE t.event_id = ? AND t.holder_id = u.id ";

        return db.query(q1,[eventId], (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    })
}