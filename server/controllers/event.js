import { db } from "../connection.js"
import jwt from "jsonwebtoken"

export const addEvent = (req,res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "gjoretinolukasriste", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
        const q = "INSERT INTO Event (`creator_id`,`title`,`description`,`datetime`,`place`,`latitude`,`longitude`,`category`,`price`) VALUES (?) ";
        const values = [
            userInfo.id,
            req.body.title,
            req.body.description,
            req.body.date+"T"+req.body.time,
            req.body.place,
            req.body.latitude,
            req.body.longitude,
            req.body.category,
            req.body.price,
        ]
        return db.query(q,[values], (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("Event created");
        })
    });

}
export const getEvents = (req,res) =>{

    const upcoming = req.query.upcoming === 'true';
    //check whether we are fetching upcoming or trending posts TODO

    const category = req.query.category;
    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "gjoretinolukasriste", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
        const q1 = `SELECT * FROM Event 
        WHERE creator_id != ? 
        ${!!category?'AND category = ?':''}
        AND datetime > NOW() ORDER BY datetime ASC `;
        const q2 = `SELECT e.*, (SELECT COUNT(*) FROM Ticket t WHERE t.event_id = e.id) AS going_count 
        FROM Event e 
        WHERE creator_id != ? 
        ${!!category?'AND category = ?':''}
        AND datetime > NOW() ORDER BY going_count DESC`;
        return db.query(upcoming?q1:q2 ,!!category?[userInfo.id, category]:[userInfo.id], (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    })
}
export const getSingleEvent = (req,res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "gjoretinolukasriste", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
        
        const q = "SELECT e.*, t.holder_id as paid FROM Event e LEFT JOIN Ticket t ON e.id = t.event_id AND t.holder_id = ? WHERE e.id = ? ";
        
        return db.query(q,[userInfo.id, req.query.eventId], (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json(data[0]);
        })
    })
}
export const getMyEvents = (req,res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "gjoretinolukasriste", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
        
        const q = "SELECT * FROM Event WHERE creator_id = ? ";
        
        return db.query(q,[userInfo.id], (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
}
export const getUserEvents = (req,res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "gjoretinolukasriste", (err) => {
    if (err) return res.status(403).json("Token is not valid");
        const q = "SELECT * FROM Event WHERE creator_id = ? ";
        return db.query(q,[req.params.id], (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
}
export const getFavoriteEvents = (req,res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "gjoretinolukasriste", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
        const q = `SELECT e.* FROM Event e WHERE e.creator_id IN 
        (SELECT followed_id FROM Following WHERE follower_id = ?) ${!!req.query.category?'AND e.category = ?':''} AND e.datetime > NOW() ORDER BY e.datetime ASC`;
        return db.query(q,!!req.query.category?[userInfo.id, req.query.category]:[userInfo.id], (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
}
export const getSearchedEvents = (req,res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "gjoretinolukasriste", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    const keyword = req.query.keyword;
    const filter = req.query.filter;
    const q = `SELECT e.category,e.creator_id,e.datetime,e.description,e.id,e.price,e.title, e.place, u.username FROM Event e, User u WHERE e.creator_id = u.id
    AND e.${filter} ${(filter==="title" || filter==="description")?`LIKE '%${keyword}%'`:"<= ?"}`;
    return db.query(q,(filter==="title" || filter==="description")?[]:[keyword], (err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data);
        })
    })
}