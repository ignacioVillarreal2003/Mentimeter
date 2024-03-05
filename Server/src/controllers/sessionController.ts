const sessionServices = require('../services/sessionServices');

const registerUser = async (req: any, res: any) => {
    try {
        const { body } = req;        
        if (!body.username || !body.password) {
            return res.status(500).send({ message: "Error processing the request." });
        } else {                        
            const result = await sessionServices.registerUser(body.username, body.password);
            if (result.message) {
                res.status(result.status).send({ message: result.message })
            } else {
                res.status(result.status).send({ token: result.token })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error processing the request." });
    }
}

const loginUser = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.username || !body.password) {
            res.status(500).send({ message: "Error processing the request." });
        } else {
            const result = await sessionServices.loginUser(body.username, body.password);
            if (result.message) {
                res.status(result.status).send({ message: result.message })
            } else {
                res.status(result.status).send({ token: result.token })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error processing the request." });
    }
}

const changePassword = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.username || !body.password || !body.newPassword) {
            res.status(500).send({ message: "Error processing the request." });
        } else {
            const result = await sessionServices.changePassword(body.username, body.password, body.newPassword);
            if (result.message) {
                res.status(result.status).send({ message: result.message })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error processing the request." });
    }
}

module.exports = {
    loginUser,
    registerUser,
    changePassword
}