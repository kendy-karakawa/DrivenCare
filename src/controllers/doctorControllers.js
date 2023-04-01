import doctorServices from "../services/doctorServices.js"


async function searchDoctor (req, res, next){
    const {name, location, specialty} = req.query

    try {
       
        const result = await doctorServices.serchDoctor({name, location, specialty})

        res.send({result})
        
    } catch (error) {
        next(err)
    }

}

async function searchUnavaliableTime (req, res, next){
    const {id} = req.params

    try {
        const unvaliableTimes = await doctorServices.searchUnavaliableTime({id})

        res.send({unvaliableTimes})
    } catch (error) {
        next(err)
    }
}

export default {
    searchDoctor,
    searchUnavaliableTime
}