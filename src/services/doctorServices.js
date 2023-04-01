import error from '../errors/index.js';
import doctorRepositories from '../repositores/doctorRepositories.js';

async function serchDoctor({name, location, specialty}){

    const result = await doctorRepositories.serchDoctor({name, location, specialty})
    return result.rows
 }

 async function searchUnavaliableTime ({id}){
   const result = await doctorRepositories.searchUnavaliableTime({id})
   return result.rows
 }

 export default {
    serchDoctor,
    searchUnavaliableTime
 }