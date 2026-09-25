import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { userModel, adminModel } from '../model/userModel.js'



export const postRegister =  async(req, res)=>{
    const {name, email, password, role} = req.body;

    const existingUser = await userModel.findOne({email}) || await adminModel.findOne({email});
    
    if(existingUser){
        return res.status(409).send("user Already created try to login")
    }else{
        const hashedPassword = await bcryptjs.hash(password, 10)

        if(role === 'User'){
            
            const user =  await userModel.create({
                name,
                email,
                password : hashedPassword,
                role
            });
            return res.status(201).json({
                message: 'User regestered successfully',
                data: user
            });
        }
        
        if(role === "Admin"){
            const admin = await adminModel.create({
                name,
                email,
                password: hashedPassword,
                role
            });
            res.status(201).json({
                message: "Admin regestered successfully",
                data: admin
            })
        }
    }

}

export const postLogin = async(req, res)=>{
    const {email, password, role} = req.body ?? {};

    if (!email || !password || !role) {
        return res.status(400).json({
            success: false,
            message: "Email, password and role are required"
        });
    }

    const Model = role === 'User' ? userModel : role === 'Admin' ? adminModel : null;

    if (!Model) {
        return res.status(400).json({
            success: false,
            message: "Role must be User or Admin"
        });
    }

    const existingUser = await Model.findOne({email});

    if (!existingUser || existingUser.role !== role) {
        return res.status(401).json({
            success: false,
            message: "Invalid email, password or role"
        });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
        return res.status(401).json({
            success: false,
            message: "Invalid email, password or role"
        });
    }

    const token = jwt.sign({
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role
    }, process.env.SECRET_KEY);

    return res.status(200).json({
        success: true,
        message: "Login successful",
        token
    });

}

export default { postRegister, postLogin };