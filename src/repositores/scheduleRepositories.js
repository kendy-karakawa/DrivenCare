import connectionDb from "../config/database.js";

async function createReserve({doctorId, userId, weekday, time}){
    await connectionDb.query(`
        INSERT INTO schedules (doctor_id, patinet_id, weekday, time ) 
        VALUES ($1, $2, $3, $4)
    `,[doctorId, userId, weekday, time])
}

export default {
    createReserve
}