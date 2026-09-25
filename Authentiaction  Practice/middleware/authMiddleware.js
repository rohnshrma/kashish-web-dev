import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next)=>{
    
    const authHeaders = req.headers.authorization;

    if(!authHeaders){
        return res.status(401).json({
            success: false,
            message: "Authorization token required",
        })
    }

    const parts = authHeaders.split(" ");
    const token = parts[1];

    try{
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decode);

        req.user = decode;
        next();
    }

    catch(err){
        res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        })
    }
    

}

export default authMiddleware;