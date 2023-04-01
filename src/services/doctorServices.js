import error from '../errors/index.js';
import doctorRepositories from '../repositores/doctorRepositories.js';

async function serchDoctor({name, location, specialty}){

    //if (!name && !location && !specialty) throw error.invalidCredentials()
   
 
    const result = await doctorRepositories.serchDoctor({name, location, specialty})
    return result.rows
 }

 export default {
    serchDoctor
 }