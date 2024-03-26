import express from "express";
const app = express();
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/event.js";
import favoritesRoutes from "./routes/favorites.js";
import ticketRoutes from "./routes/ticket.js";
import transactionsRoutes from "./routes/transactions.js";
import userRoutes from "./routes/user.js";

import cors from "cors"
import cookieParser from "cookie-parser"

const port = 8068

const corsOptions = {
    origin: 'http://88.200.63.148:3068', // Specify the requesting origin
    credentials: true, // Accept credentials (cookies, authentication data)
};

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/server/auth", authRoutes)
app.use("/server/event", eventRoutes)
app.use("/server/favorites", favoritesRoutes)
app.use("/server/ticket", ticketRoutes)
app.use("/server/transactions", transactionsRoutes)
app.use("/server/user", userRoutes)

app.listen(process.env.PORT || port, ()=>{
    console.log("lessgo")
})