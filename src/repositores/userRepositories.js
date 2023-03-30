import connectionDb from "../config/database.js"


async function findByEmail(email) {
    return await connectionDb.query(
      `SELECT * FROM users WHERE email=$1`,
      [email]
    );
  }

async function create ({ name, email, password,location, is_doctor}){
    return await connectionDb.query(`
    INSERT INTO users (name, email, password, location, is_doctor) 
    VALUES ($1, $2, $3, $4, $5) RETURNING id;`, [name, email, password,location, is_doctor ])
}

async function createSpecialty ({userId, specialty}){
    await connectionDb.query(`
    INSERT INTO specialties (user_id, specialty)
    VALUES ($1, $2)`, [userId, specialty])
    
}

async function createSession({token, userId}){
    await connectionDb.query(`
    INSERT INTO sessions (token, user_id)
    VALUES ($1, $2)`, [token, userId])
}

export default {
    findByEmail,
    create,
    createSpecialty,
    createSession
}