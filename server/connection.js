import mysql from "mysql"


export const db = mysql.createConnection({
    host:"localhost",
    user:"studenti",
    password:"12345678",
    database:"MIT2024_89211020",
})

db.connect((err) => {
    if(err){
        console.log("ERROR: " + err.message);
        return;    
    }
    console.log('Connection established');
})
  
