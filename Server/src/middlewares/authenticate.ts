const jwt = require('jsonwebtoken');

export function authenticate(req: any, res: any, next: any) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).send({
            message: "Unauthorized"
        });
    } else {
        const token: string = authorizationHeader.split(' ')[1];
        try {
            jwt.verify(token, process.env.SECRET);
            next();
        } catch (err: any) {
            if (err.name === 'JsonWebTokenError') {
                res.status(401).send({
                    message: err.name
                });
            } else {
                const error = new Error("Error! Something went wrong.");
                return next(error);
            }
        }
    }
}