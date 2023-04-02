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

async function confirmReserve(req, res, next){
    const id = req.params.id

    try {
        await scheduleServices.confirmReserve({id})
        res.sendStatus(200)
        
    } catch (err) {
        next(err)
    }
}

async function cancelReserve(req, res, next){
    const id = req.params.id

    try {
        await scheduleServices.cancelReserve({id})
        res.sendStatus(200)
        
    } catch (err) {
        next(err)
    }
}



async function findSchedulesByPatientId(req, res, next){
    const {id} = req.params

    try {
        const result = await scheduleServices.findSchedulesByPatientId({id})
        
        res.send(result)
    } catch (err) {
        next(err)
    }
}

async function findSchedulesByDoctorId(req, res, next){
    const {id} = req.params

    try {
        const result = await scheduleServices.findSchedulesByDoctorId({id})
        res.send(result)
    } catch (err) {
        next(err)
    }
}

async function findFinishedSchedulesByPatientId(req, res, next){
    const {id} = req.params

    try {
        const result = await scheduleServices.findFinishedSchedulesByPatientId({id})
        res.send(result)
    } catch (err) {
        next(err)
    }
}

async function findFinishedSchedulesByDoctorId(req, res, next){
    const {id} = req.params

    try {
        const result = await scheduleServices.findFinishedSchedulesByDoctorId({id})
        res.send(result)
    } catch (err) {
        next(err)
    }
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