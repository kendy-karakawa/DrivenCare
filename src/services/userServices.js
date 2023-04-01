import bcrypt from 'bcrypt';
import error from '../errors/index.js';
import userRepositories from '../repositores/userRepositories.js';
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config();

async function signup ({ name, email, password, location, is_doctor, specialty }){
    const { rowCount } = await userRepositories.findByEmail(email);
    if (rowCount) throw error.duplicatedEmail();


    const hashPassword = await bcrypt.hash(password, 10);
    const user =  await userRepositories.create({ name, email, password: hashPassword,location, is_doctor});
    
    const userId = user.rows[0].id

    console.log(userId, is_doctor)
    if (is_doctor == "true") await userRepositories.createSpecialty({userId, specialty}); 
}

async function signin({email, password}){
    const {rowCount, rows: [user]} = await userRepositories.findByEmail(email)
    if (!rowCount) throw error.invalidCredentials()

    const validPassword = bcrypt.compare(password, user.password)  
    if(!validPassword) throw error.invalidCredentials()

    const token = jwt.sign({id: user.id}, process.env.SECRET_JWT)
    return token
}



export default{
    signup,
    signin,
    
}