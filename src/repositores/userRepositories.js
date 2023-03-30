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
    console.log("entreis")
    await connectionDb.query(`
    INSERT INTO specialties (user_id, specialty)
    VALUES ($1, $2)`, [userId, specialty])
    
}

export default {
    findByEmail,
    create,
    createSpecialty
}