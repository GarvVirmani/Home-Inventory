import jwt from "jsonwebtoken";

const isAuthenticated=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        console.log(token);
        if(!token){
            return res.status(401).json({
                message:"User not found",
                success:false
            })
        }
        const decode=jwt.verify(token,process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid Token",
                success:false
            })
        }
        req.username=decode.username;
        next();
    }
    catch(error){
        console.error("Authentication error:",error);
        return res.status(500).json({
            message:"Internal Server Error",
            success: false
        });
    }
}

export default isAuthenticated;