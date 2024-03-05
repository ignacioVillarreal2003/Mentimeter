import { IBrainstormingContent, IFeedbackContent, IMultipleChoiceContent, IMultipleChoiceOption, IQuizContent, IQuizOption, IRoomBrainstorming, IRoomFeedback, IRoomMultipleChoice, IRoomQuiz, IUser, Room } from "../types";

const usuarios = require('../database/users');
const rooms = require('../database/rooms');

const errorMessage = "Error in the service when processing the request.";

const getRoom = async (roomCode: string) => {
    try {
        const type: Room = await rooms.getRoomType(roomCode);
        let result = undefined;
        if (type == "Feedback") {
            result = await rooms.getRoomFeedback(roomCode);
        } else if (type == "MultipleChoice") {
            result = await rooms.getRoomMultipleChoice(roomCode);
        } else if (type == "Brainstorming") {
            result = await rooms.getRoomBrainstorming(roomCode);
        } else if (type == "Quiz") {
            result = await rooms.getRoomQuiz(roomCode);
        }
        if (result) {
            return { status: 200, room: result };
        } else {
            return { status: 400, message: "The room code is incorrect." };
        }
    } catch (error) {
        throw new Error(errorMessage);
    }
}

const getRoomFeedback = async (roomCode: string) => {
    try {
        const result = await rooms.getRoomFeedback(roomCode);
        if (result) {            
            return { status: 200, room: result };
        } else {
            return { status: 400, message: "The room code is incorrect." };
        }
    } catch (error) {
        throw new Error(errorMessage);
    }
}

const postRoomFeedback = async (username: string, roomCode: string, roomType: string, content: IFeedbackContent[]) => {
    try {
        const existingUser: IUser = await usuarios.getUser(username);
        if (!existingUser) {
            return { status: 400, message: "The user does not exist." };
        } else {
            const result = await rooms.postRoomFeedback(username, roomCode, roomType, content);
            if (result) {
                await rooms.postRoomType(roomCode, roomType);
                return { status: 200, message: "The room has been published." };
            }
            return { status: 500, message: errorMessage };
        }
    } catch (error) {
        throw new Error(errorMessage);
    }
}

const postRoomAnswersFeedback = async (roomCode: string, content: IFeedbackContent) => {
    try {
        const room: IRoomFeedback = await rooms.getRoomFeedback(roomCode);
        if (room) {
            room.content.forEach((e: IFeedbackContent) => {
                if (e.question == content.question) {
                    for (let p = 0; p < 5; p++) {
                        e.rating[p] += content.rating[p];
                    }
                }
            })
            const result = await rooms.putRoomFeedback(room);            
            if (result) {
                return { status: 200, message: "The room has been actualized." };
            }
            return { status: 500, message: errorMessage };
        }
        return { status: 500, message: "Error in the service when processing the request." };
    } catch (error) {
        throw new Error("Error in the service when processing the request.");
    }
}

const getRoomMultipleChoice = async (roomCode: string) => {
    try {
        const result = await rooms.getRoomMultipleChoice(roomCode);
        if (result) {
            return { status: 200, room: result };
        } else {
            return { status: 400, message: "The room code is incorrect." };
        }
    } catch (error) {
        throw new Error(errorMessage);
    }
}

const postRoomMultipleChoice = async (username: string, roomCode: string, roomType: string, content: IMultipleChoiceContent[]) => {
    try {
        const existingUser: IUser = await usuarios.getUser(username);
        if (!existingUser) {
            return { status: 400, message: "The user does not exist." };
        } else {
            const result = await rooms.postRoomMultipleChoice(username, roomCode, roomType, content);
            if (result) {
                await rooms.postRoomType(roomCode, roomType);
                return { status: 200, message: "The room has been published." };
            }
            return { status: 500, message: errorMessage };
        }
    } catch (error) {
        throw new Error(errorMessage);
    }
}

const postRoomAnswersMultipleChoice = async (roomCode: string, content: IMultipleChoiceContent) => {
    try {
        const room: IRoomMultipleChoice = await rooms.getRoomMultipleChoice(roomCode);
        if (room) {
            room.content.forEach((e: IMultipleChoiceContent) => {
                if (e.question == content.question) {
                    e.optionsMultipleChoice.forEach((s: IMultipleChoiceOption) => {
                        content.optionsMultipleChoice.forEach((k: IMultipleChoiceOption) => {
                            if (s.option == k.option){
                                s.rating += k.rating;
                            }
                        })
                    })
                }
            })
            const result = await rooms.putRoomMultipleChoice(room);
            if (result) {
                return { status: 200, message: "The room has been actualized." };
            }
            return { status: 500, message: errorMessage };
        }
        return { status: 500, message: "Error in the service when processing the request." };
    } catch (error) {
        throw new Error("Error in the service when processing the request.");
    }
}

const getRoomBrainstorming = async (roomCode: string) => {
    try {
        const result = await rooms.getRoomBrainstorming(roomCode);
        if (result) {
            return { status: 200, room: result };
        } else {
            return { status: 400, message: "The room code is incorrect." };
        }
    } catch (error) {
        throw new Error(errorMessage);
    }
}

const postRoomBrainstorming = async (username: string, roomCode: string, roomType: string, content: IBrainstormingContent[]) => {
    try {
        const existingUser: IUser = await usuarios.getUser(username);
        if (!existingUser) {
            return { status: 400, message: "The user does not exist." };
        } else {
            const result = await rooms.postRoomBrainstorming(username, roomCode, roomType, content);
            if (result) {
                await rooms.postRoomType(roomCode, roomType);
                return { status: 200, message: "The room has been published." };
            }
            return { status: 500, message: errorMessage };
        }
    } catch (error) {
        throw new Error(errorMessage);
    }
}

const postRoomAnswersBrainstorming = async (roomCode: string, content: IBrainstormingContent) => {
    try {
        const room: IRoomBrainstorming = await rooms.getRoomBrainstorming(roomCode);
        if (room) {
            room.content.forEach((e: IBrainstormingContent) =>{
                if (e.question = content.question){
                    content.ideas.forEach((s: string) => {
                        e.ideas.push(s);
                    })
                }
            })
            const result = await rooms.putRoomBrainstorming(room);
            if (result) {
                return { status: 200, message: "The room has been actualized." };
            }
            return { status: 500, message: errorMessage };
        }
        return { status: 500, message: "Error in the service when processing the request." };
    } catch (error) {
        throw new Error("Error in the service when processing the request.");
    }
}

const getRoomQuiz = async (roomCode: string) => {
    try {
        const result = await rooms.getRoomQuiz(roomCode);
        if (result) {
            return { status: 200, room: result };
        } else {
            return { status: 400, message: "The room code is incorrect." };
        }
    } catch (error) {
        throw new Error(errorMessage);
    }
}

const postRoomQuiz = async (username: string, roomCode: string, roomType: string, content: IQuizContent[]) => {
    try {
        const existingUser: IUser = await usuarios.getUser(username);
        if (!existingUser) {
            return { status: 400, message: "The user does not exist." };
        } else {
            const result = await rooms.postRoomQuiz(username, roomCode, roomType, content);
            if (result) {
                await rooms.postRoomType(roomCode, roomType);
                return { status: 200, message: "The room has been published." };
            }
            return { status: 500, message: errorMessage };
        }
    } catch (error) {
        throw new Error(errorMessage);
    }
}

const postRoomAnswersQuiz = async (roomCode: string, content: IQuizContent) => {
    try {
        const room: IRoomQuiz = await rooms.getRoomQuiz(roomCode);
        if (room) {
            room.content.forEach((e: IQuizContent) =>{
                if (e.question == content.question){
                    e.optionsQuiz.forEach((s: IQuizOption) => {
                        content.optionsQuiz.forEach((p: IQuizOption) => {
                            if (s.option == p.option){
                                s.quantity += p.quantity;
                            }

                        })
                    })
                }
            })
            const result = await rooms.putRoomQuiz(room);
            if (result) {
                return { status: 200, message: "The room has been actualized." };
            }
            return { status: 500, message: errorMessage };
        }
        return { status: 500, message: "Error in the service when processing the request." };
    } catch (error) {
        throw new Error("Error in the service when processing the request.");
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