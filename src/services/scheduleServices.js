import errors from "../errors/index.js"
import doctorRepositories from "../repositores/doctorRepositories.js"
import scheduleRepositories from "../repositores/scheduleRepositories.js"

async function createReserve({doctorId, weekday, time, userId}){
    
    const {rowCount} = await doctorRepositories.findById({doctorId})
   
    if (!rowCount) throw errors.notFound()
    
    
    await scheduleRepositories.createReserve({doctorId, weekday, time, userId})
    
}

export default {
    createReserve
}