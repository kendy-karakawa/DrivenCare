import connectionDb from "../config/database.js";

async function serchDoctor ({name, location, specialty}){
    return await connectionDb.query(`
    select 
        u.id, 
        u.name,
        u.location,
        s.specialty 
    FROM 
	    users u
    JOIN specialties s
    ON u.id = s.user_id
    WHERE u.is_doctor = true AND 
    CASE 
        WHEN $1 <> '' THEN u.name LIKE '%' || $1 || '%'
        WHEN $2 <> '' THEN u.location = $2
        WHEN $3 <> '' THEN s.specialty = $3
        ELSE TRUE
    END
    `, [name, location, specialty])
}

async function searchUnavaliableTime({id}){
    return await connectionDb.query(`
    SELECT weekday, time FROM schedules WHERE doctor_id = $1
    `, [id])
}

async function findById({doctorId}){
    return await connectionDb.query(`
    SELECT * FROM users WHERE is_doctor = true AND id = $1
    `, [doctorId])
}

export default {
    serchDoctor,
    searchUnavaliableTime,
    findById
}
