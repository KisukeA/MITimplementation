import { db } from "../connection.js"
import jwt from "jsonwebtoken";

export const getUser = (req,res) =>{
    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "gjoretinolukasriste", (err, userInfo) => {
        const userId = req.params.userId;
        const q = `SELECT u.*, f.followed_id as bFollowing,
        (SELECT COUNT(*) FROM Following WHERE followed_id = ?) AS followers, (SELECT COUNT(*) FROM Following WHERE follower_id = ?) AS following
        FROM User u LEFT JOIN Following f ON u.id = f.followed_id WHERE u.id = ?`;
        return db.query(q,[userId, userId, userId],(err,data)=>{
            if(err) return res.status(500).json(err)
            if(data.length === 0) return res.status(404).json("User not found")
            const { password, ...others } = data[0];
            return res.status(200).json(others);
        });
    })
}
// export const getOtherUser = (req,res) =>{
//     const userId = req.params.userId;
//     const q = "SELECT u.*, f.followed_id as following FROM User u LEFT JOIN Following f ON u.id = f.follower_id WHERE u.id = ?";
//     return db.query(q,[userId],(err,data)=>{
//         if(err) return res.status(500).json(err)
//         if(data.length === 0) return res.status(404).json("User not found")
//         const { password, ...others } = data[0];
//         return res.status(200).json(others);
//     });
// }//this is for testing but it worked so we use it instead of the above function
export const getSearchedUsers = (req,res) =>{
    const token = req.cookies.token;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "gjoretinolukasriste", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const keyword = "%"+req.query.keyword+"%";
        const filter = req.query.filter;
        const q = `SELECT id,username,role,email,profile_picture FROM User WHERE ${filter} LIKE ?`;
        return db.query(q,[keyword], (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
}