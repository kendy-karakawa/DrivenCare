import scheduleServices from "../services/scheduleServices.js"


async function createReserve(req, res, next){
    const {doctorId, weekday, time } = req.body
    const userId= res.locals.user.id 
    
    try {
        await scheduleServices.createReserve({doctorId, weekday, time, userId})
        res.sendStatus(201)
    } catch (err) {
        next(err)
    }
}

export default {
    createReserve
}