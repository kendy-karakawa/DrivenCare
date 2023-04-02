import connectionDb from "../config/database.js";

async function createReserve({doctorId, userId, weekday, time}){
    await connectionDb.query(`
        INSERT INTO schedules (doctor_id, patient_id, weekday, time ) 
        VALUES ($1, $2, $3, $4)
    `,[doctorId, userId, weekday, time])
}

async function confirmReserve({id}){
   return await connectionDb.query(`
    UPDATE schedules SET status = 'confirmed' WHERE id = $1`, [id])
}

async function cancelReserve({id}){
    return await connectionDb.query(`
    UPDATE schedules SET status = 'canceled' WHERE id = $1`, [id])
}



async function findSchedulesByPatientId({id}){
    return await connectionDb.query(`
    SELECT 
        s.id,
        ud.name as doctor,
        sp.specialty as specialty,
        up.name as patient,
        s.weekday,
        s.time
    FROM schedules s 
    JOIN users up
    ON s.patient_id = up.id
    JOIN users ud 
    ON s.doctor_id = ud.id
    JOIN specialties sp 
    ON ud.id = sp.user_id
    WHERE s.patient_id = $1 AND s.status <> 'finished'
    GROUP by ud.name, sp.specialty, up.name, s.weekday, s.time, s.id;
    `, [id])
}

async function findSchedulesByDoctorId({id}){
    return await connectionDb.query(`
    SELECT 
        s.id,
        ud.name as doctor,
        sp.specialty as specialty,
        up.name as patient,
        s.weekday,
        s.time,
        s.status
    FROM schedules s 
    JOIN users up
    ON s.patient_id = up.id
    JOIN users ud 
    ON s.doctor_id = ud.id
    JOIN specialties sp 
    ON ud.id = sp.user_id
    WHERE s.doctor_id = $1 AND s.status <> 'finished'
    GROUP by ud.name, sp.specialty, up.name, s.weekday, s.time, s.id, s.status;
    `, [id])
}

async function findFinishedSchedulesByPatientId({id}){
    return await connectionDb.query(`
    SELECT 
        s.id,
        ud.name as doctor,
        sp.specialty as specialty,
        up.name as patient,
        s.weekday,
        s.time
    FROM schedules s 
    JOIN users up
    ON s.patient_id = up.id
    JOIN users ud 
    ON s.doctor_id = ud.id
    JOIN specialties sp 
    ON ud.id = sp.user_id
    WHERE s.patient_id = $1 AND s.status = 'finished'
    GROUP by ud.name, sp.specialty, up.name, s.weekday, s.time, s.id;
    `, [id])
}

async function findFinishedSchedulesByDoctorId({id}){
    return await connectionDb.query(`
    SELECT 
        s.id,
        ud.name as doctor,
        sp.specialty as specialty,
        up.name as patient,
        s.weekday,
        s.time
    FROM schedules s 
    JOIN users up
    ON s.patient_id = up.id
    JOIN users ud 
    ON s.doctor_id = ud.id
    JOIN specialties sp 
    ON ud.id = sp.user_id
    WHERE s.doctor_id = $1 AND s.status = 'finished'
    GROUP by ud.name, sp.specialty, up.name, s.weekday, s.time, s.id;
    `, [id])
}

export default {
    createReserve,
    confirmReserve,
    cancelReserve,
    findSchedulesByPatientId,
    findSchedulesByDoctorId,
    findFinishedSchedulesByPatientId,
    findFinishedSchedulesByDoctorId
}