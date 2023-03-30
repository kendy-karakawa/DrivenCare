import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import userRepositories from '../repositores/userRepositories.js';

async function signup ({ name, email, password, location, is_doctor, specialty }){
    const { rowCount } = await userRepositories.findByEmail(email);
    if (rowCount) throw new Error("User already exists");


    const hashPassword = await bcrypt.hash(password, 10);
    const user =  await userRepositories.create({ name, email, password: hashPassword,location, is_doctor});

    const userId = user.rows[0].id
    if (is_doctor === true) await userRepositories.createSpecialty({userId, specialty}); 
}

export default{
    signup
}