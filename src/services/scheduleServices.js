import errors from "../errors/index.js"
import doctorRepositories from "../repositores/doctorRepositories.js"
import scheduleRepositories from "../repositores/scheduleRepositories.js"

async function createReserve({doctorId, weekday, time, userId}){
    
    const {rowCount} = await doctorRepositories.findById({doctorId})
   
    if (!rowCount) throw errors.notFound()
    
    
    await scheduleRepositories.createReserve({doctorId, weekday, time, userId})
    
}

async function confirmReserve({id}){
    const {rowCount} = await scheduleRepositories.confirmReserve({id})
    if (!rowCount) throw errors.notFound()
}

async function cancelReserve({id}){
    const {rowCount} = await scheduleRepositories.cancelReserve({id})
    if (!rowCount) throw errors.notFound()
}



async function findSchedulesByPatientId({id}){
   const result = await scheduleRepositories.findSchedulesByPatientId({id})
   if (result.rowCount === 0) throw errors.notFound()
   return result.rows
}

async function findSchedulesByDoctorId({id}){
    const result =  await scheduleRepositories.findSchedulesByDoctorId({id})
    if (result.rowCount === 0) throw errors.notFound()
    return result.rows
}

async function findFinishedSchedulesByPatientId({id}){
    const result = await scheduleRepositories.findFinishedSchedulesByPatientId({id})
    if (result.rowCount === 0) throw errors.notFound()
    return result.rows
 }
 
 async function findFinishedSchedulesByDoctorId({id}){
     const result =  await scheduleRepositories.findFinishedSchedulesByDoctorId({id})
     if (result.rowCount === 0) throw errors.notFound()
     return result.rows
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