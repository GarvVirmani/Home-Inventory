import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import itemRoute from "./routes/item.route.js";
import path from "path";

dotenv.config();
const app=express();

const _dirname=path.resolve();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

app.use("/user",userRoute);
app.use("/item",itemRoute);

app.use(express.static(path.join(_dirname, "/Frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
});


const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running at port ${PORT}`);
})