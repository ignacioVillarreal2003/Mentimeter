import { sendNewBrainstorming, sendNewFeedback, sendNewMultipleChoice, sendNewQuiz } from "../socket";
const roomServices = require('../services/roomServices');

const errorMessage = "Error processing the request.";

const getRoom = async (req: any, res: any) => {
    try {
        const { params } = req;
        if (!params.roomCode) {
            res.status(500).send({ message: errorMessage });
        } else {
            const result = await roomServices.getRoom(params.roomCode);
            if (result) {
                res.status(result.status).send({ room: result.room })
            } else {
                res.status(500).send({ message: errorMessage })
            }
        }
    } catch (error) {
        res.status(500).send({ message: errorMessage });
    }
}

const getRoomFeedback = async (req: any, res: any) => {
    try {
        const { params } = req;
        if (!params.roomCode) {
            res.status(500).send({ message: errorMessage });
        } else {
            const result = await roomServices.getRoomFeedback(params.roomCode);
            if (result) {
                res.status(result.status).send({ room: result.room })
            } else {
                res.status(500).send({ message: errorMessage })
            }
        }
    } catch (error) {
        res.status(500).send({ message: errorMessage });
    }
}

const postRoomFeedback = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.username || !body.roomCode || !body.roomType || !body.content){
            res.status(500).send({ message: errorMessage });
        } else {
            const result = await roomServices.postRoomFeedback(body.username, body.roomCode, body.roomType, body.content);
            if (result) {
                res.status(result.status).send({ message: result.message })
            } else {
                res.status(500).send({ message: errorMessage })
            }
        }
    } catch (error) {
        res.status(500).send({ message: errorMessage });
    }
}

const postRoomAnswersFeedback = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.roomCode || !body.content) {
            res.status(500).send({ message: errorMessage });
        } else {
            const result = await roomServices.postRoomAnswersFeedback(body.roomCode, body.content);
            if (result) {
                sendNewFeedback(body.roomCode);
                res.status(result.status).send({ message: result.message })
            } else {
                res.status(500).send({ message: errorMessage });
            }
        }
    } catch (error) {
        res.status(500).send({ message: errorMessage });
    }
}

const getRoomMultipleChoice = async (req: any, res: any) => {
    try {
        const { params } = req;
        if (!params.roomCode) {
            res.status(500).send({ message: errorMessage });
        } else {
            const result = await roomServices.getRoomMultipleChoice(params.roomCode);
            if (result) {
                res.status(result.status).send({ room: result.room })
            } else {
                res.status(500).send({ message: errorMessage })
            }
        }
    } catch (error) {
        res.status(500).send({ message: errorMessage });
    }
}

const postRoomMultipleChoice = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.username || !body.roomCode || !body.roomType || !body.content){
            res.status(500).send({ message: errorMessage });
        } else {
            const result = await roomServices.postRoomMultipleChoice(body.username, body.roomCode, body.roomType, body.content);
            if (result) {
                res.status(result.status).send({ message: result.message })
            } else {
                res.status(500).send({ message: errorMessage })
            }
        }
    } catch (error) {
        res.status(500).send({ message: errorMessage });
    }
}

const postRoomAnswersMultipleChoice = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.roomCode || !body.content) {
            res.status(500).send({ message: errorMessage });
        } else {
            const result = await roomServices.postRoomAnswersMultipleChoice(body.roomCode, body.content);
            if (result) {
                sendNewMultipleChoice(body.roomCode);
                res.status(result.status).send({ message: result.message })
            } else {
                res.status(500).send({ message: errorMessage });
            }
        }
    } catch (error) {
        res.status(500).send({ message: errorMessage });
    }
}

const getRoomBrainstorming = async (req: any, res: any) => {
    try {
        const { params } = req;
        if (!params.roomCode) {
            res.status(500).send({ message: errorMessage });
        } else {
            const result = await roomServices.getRoomBrainstorming(params.roomCode);
            if (result) {
                res.status(result.status).send({ room: result.room })
            } else {
                res.status(500).send({ message: errorMessage })
            }
        }
    } catch (error) {
        res.status(500).send({ message: errorMessage });
    }
}

const postRoomBrainstorming = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.username || !body.roomCode || !body.roomType || !body.content){
            res.status(500).send({ message: errorMessage });
        } else {
            const result = await roomServices.postRoomBrainstorming(body.username, body.roomCode, body.roomType, body.content);
            if (result) {
                res.status(result.status).send({ message: result.message })
            } else {
                res.status(500).send({ message: errorMessage })
            }
        }
    } catch (error) {
        res.status(500).send({ message: errorMessage });
    }
}

const postRoomAnswersBrainstorming = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.roomCode || !body.content) {
            res.status(500).send({ message: errorMessage });
        } else {
            const result = await roomServices.postRoomAnswersBrainstorming(body.roomCode, body.content);
            if (result) {
                sendNewBrainstorming(body.roomCode);
                res.status(result.status).send({ message: result.message })
            } else {
                res.status(500).send({ message: errorMessage });
            }
        }
    } catch (error) {
        res.status(500).send({ message: errorMessage });
    }
}

const getRoomQuiz = async (req: any, res: any) => {
    try {
        const { params } = req;
        if (!params.roomCode) {
            res.status(500).send({ message: errorMessage });
        } else {
            const result = await roomServices.getRoomQuiz(params.roomCode);
            if (result) {
                res.status(result.status).send({ room: result.room })
            } else {
                res.status(500).send({ message: errorMessage })
            }
        }
    } catch (error) {
        res.status(500).send({ message: errorMessage });
    }
}

const postRoomQuiz = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.username || !body.roomCode || !body.roomType || !body.content){
            res.status(500).send({ message: errorMessage });
        } else {
            const result = await roomServices.postRoomQuiz(body.username, body.roomCode, body.roomType, body.content);
            if (result) {
                res.status(result.status).send({ message: result.message })
            } else {
                res.status(500).send({ message: errorMessage })
            }
        }
    } catch (error) {
        res.status(500).send({ message: errorMessage });
    }
}

const postRoomAnswersQuiz = async (req: any, res: any) => {
    try {
        const { body } = req;
        if (!body.roomCode || !body.content) {
            res.status(500).send({ message: errorMessage });
        } else {
            const result = await roomServices.postRoomAnswersQuiz(body.roomCode, body.content);
            if (result) {
                sendNewQuiz(body.roomCode);
                res.status(result.status).send({ message: result.message })
            } else {
                res.status(500).send({ message: errorMessage });
            }
        }
    } catch (error) {
        res.status(500).send({ message: errorMessage });
    }
}

module.exports = {
    getRoom,
    getRoomFeedback,
    postRoomFeedback,
    postRoomAnswersFeedback,
    getRoomMultipleChoice,
    postRoomMultipleChoice,
    postRoomAnswersMultipleChoice,
    getRoomBrainstorming,
    postRoomBrainstorming,
    postRoomAnswersBrainstorming,
    getRoomQuiz,
    postRoomQuiz,
    postRoomAnswersQuiz
}