import {IBrainstormingContent, IFeedbackContent, IMultipleChoiceContent, IQuizContent, IRoomBrainstorming, IRoomFeedback, IRoomMultipleChoice, IRoomQuiz } from "../types";

require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOSTRING)
    .then(() => console.log('Connected!'));

////////////////////////////////////////////* Schemas ////////////////////////////////////////////*
var roomTypeSchema = mongoose.Schema({
    roomCode: String,
    roomType: String
});

const RoomType = mongoose.model('RoomType', roomTypeSchema, 'RoomTypes');

var feedbackSchema = mongoose.Schema({
    username: String,
    roomCode: String,
    roomType: String,
    content: []
});

const Feedback = mongoose.model('Feedback', feedbackSchema, 'Feedbacks');

var multipleChoiceSchema = mongoose.Schema({
    username: String,
    roomCode: String,
    roomType: String,
    content: []
});

const MultipleChoice = mongoose.model('MultipleChoice', multipleChoiceSchema, 'MultipleChoices');

var brainstormingSchema = mongoose.Schema({
    username: String,
    roomCode: String,
    roomType: String,
    content: []
});

const Brainstorming = mongoose.model('Brainstorming', brainstormingSchema, 'Brainstormings');

var quizSchema = mongoose.Schema({
    username: String,
    roomCode: String,
    roomType: String,
    content: []
});

const Quiz = mongoose.model('Quiz', quizSchema, 'Quizes');

//////////////////////////////////////////* Operaciones //////////////////////////////////////////*
/* Type */
async function getRoomType(roomCode: string): Promise<string | undefined> {
    try {
        const result = await RoomType.findOne({ roomCode: { $eq: roomCode } });
        if (result) {
            const roomType: string = result.roomType;
            return roomType;
        } else {
            return undefined;
        }
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

async function postRoomType(roomCode: string, roomType: string): Promise<boolean> {
    try {
        const type = new RoomType({
            roomCode: roomCode,
            roomType: roomType,
        });
        const result = await type.save();
        if (result) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

/* Feedback */
async function getRoomFeedback(roomCode: string): Promise<IRoomFeedback | undefined> {
    try {
        const result = await Feedback.findOne({ roomCode: { $eq: roomCode } });
        if (result) {
            const room: IRoomFeedback = result;
            return room;
        } else {
            return undefined;
        }
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

async function postRoomFeedback(username: string, roomCode: string, roomType: string, content: IFeedbackContent[]): Promise<boolean> {
    try {
        const feedback = new Feedback({
            username: username,
            roomCode: roomCode,
            roomType: roomType,
            content: content
        });
        const result = await feedback.save();
        if (result) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function putRoomFeedback(room: IRoomFeedback): Promise<boolean> {
    try {
        const result = await Feedback.updateOne({ roomCode: room.roomCode }, { $set: { content: room.content }});
        if (result && result.modifiedCount > 0) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

/* Multiple choice */
async function getRoomMultipleChoice(roomCode: string): Promise<IRoomMultipleChoice | undefined> {
    try {
        const result = await MultipleChoice.findOne({ roomCode: { $eq: roomCode } });
        if (result) {
            const room: IRoomMultipleChoice = result;
            return room;
        } else {
            return undefined;
        }
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

async function postRoomMultipleChoice(username: string, roomCode: string, roomType: string, content: IMultipleChoiceContent[]): Promise<boolean> {
    try {
        const multipleChoice = new MultipleChoice({
            username: username,
            roomCode: roomCode,
            roomType: roomType,
            content: content
        });
        const result = await multipleChoice.save();
        if (result) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function putRoomMultipleChoice(room: IRoomMultipleChoice): Promise<boolean> {
    try {
        const result = await MultipleChoice.updateOne({ roomCode: room.roomCode }, { $set: { content: room.content }});
        if (result && result.modifiedCount > 0) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

/* Brainstorming */
async function getRoomBrainstorming(roomCode: string): Promise<IRoomBrainstorming | undefined> {
    try {
        const result = await Brainstorming.findOne({ roomCode: { $eq: roomCode } });
        if (result) {
            const room: IRoomBrainstorming = result;
            return room;
        } else {
            return undefined;
        }
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

async function postRoomBrainstorming(username: string, roomCode: string, roomType: string, content: IBrainstormingContent): Promise<boolean> {
    try {
        const brainstorming = new Brainstorming({
            username: username,
            roomCode: roomCode,
            roomType: roomType,
            content: content
        });
        const result = await brainstorming.save();
        if (result) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function putRoomBrainstorming(room: IRoomBrainstorming): Promise<boolean> {
    try {
        const result = await Brainstorming.updateOne({ roomCode: room.roomCode }, { $set: { content: room.content }});
        if (result && result.modifiedCount > 0) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

/* Quiz */
async function getRoomQuiz(roomCode: string): Promise<IRoomQuiz | undefined> {
    try {
        const result = await Quiz.findOne({ roomCode: { $eq: roomCode } });
        if (result) {
            const room: IRoomQuiz = result;
            return room;
        } else {
            return undefined;
        }
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

async function postRoomQuiz(username: string, roomCode: string, roomType: string, content: IQuizContent): Promise<boolean> {
    try {
        const quiz = new Quiz({
            username: username,
            roomCode: roomCode,
            roomType: roomType,
            content: content
        });
        const result = await quiz.save();
        if (result) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function putRoomQuiz(room: IRoomQuiz): Promise<boolean> {
    try {
        const result = await Quiz.updateOne({ roomCode: room.roomCode }, { $set: { content: room.content }});
        if (result && result.modifiedCount > 0) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = { 
    getRoomType,
    postRoomType,
    getRoomFeedback, 
    postRoomFeedback, 
    putRoomFeedback,
    getRoomMultipleChoice,
    postRoomMultipleChoice,
    putRoomMultipleChoice,
    getRoomBrainstorming,
    postRoomBrainstorming,
    putRoomBrainstorming,
    getRoomQuiz,
    postRoomQuiz,
    putRoomQuiz
}

