import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import error from '../errors/index.js';
import userRepositories from '../repositores/userRepositories.js';

async function signup ({ name, email, password, location, is_doctor, specialty }){
    const { rowCount } = await userRepositories.findByEmail(email);
    if (rowCount) throw error.duplicatedEmail();


    const hashPassword = await bcrypt.hash(password, 10);
    const user =  await userRepositories.create({ name, email, password: hashPassword,location, is_doctor});

    const userId = user.rows[0].id
    if (is_doctor === true) await userRepositories.createSpecialty({userId, specialty}); 
}

async function signin({email, password}){
    const {rowCount, rows: [user]} = await userRepositories.findByEmail(email)
    if (!rowCount) throw error.invalidCredentials()

    const validPassword = bcrypt.compare(password, user.password)  
    if(!validPassword) throw error.invalidCredentials()

    const token = uuid()
    await userRepositories.createSession({token, userId: user.id})

    return token
}

export default{
    signup,
    signin
}