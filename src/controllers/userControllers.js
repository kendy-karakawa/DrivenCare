import userServices from "../services/userServices.js";

async function signup(req, res, next){
    const {name, email, password, location, is_doctor, specialty} = req.body

    try {
        await userServices.signup({ name, email, password, location, is_doctor, specialty});
        return res.sendStatus(201);
    } catch (err) {
        next(err)
    }
}

async function signin (req, res, next){
    const {email, password} = req.body

    try {
        const token = await userServices.signin({email, password})
        res.send({token})
        
    } catch (err) {
        next(err)
    }
}




export default {
    signup,
    signin,
   
}