import userServices from "../services/userServices.js";

async function signup(req, res){
    const {name, email, password, location, is_doctor, specialty} = req.body

    try {
        await userServices.signup({ name, email, password, location, is_doctor, specialty});
        return res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export default {
    signup
}