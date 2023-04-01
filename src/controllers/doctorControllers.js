import doctorServices from "../services/doctorServices.js"


async function serchDoctor (req, res, next){
    const {name, location, specialty} = req.query

    try {
       
        const result = await doctorServices.serchDoctor({name, location, specialty})

        res.send({result})
        
    } catch (error) {
        next(err)
    }

}

export default {
    serchDoctor
}