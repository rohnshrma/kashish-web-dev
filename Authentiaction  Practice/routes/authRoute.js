import express from 'express'

import {postRegister, postLogin} from '../controller/authController.js'

const authRoute = express.Router();

authRoute.post('/register', postRegister);
authRoute.post('/login', postLogin)


export default authRoute;