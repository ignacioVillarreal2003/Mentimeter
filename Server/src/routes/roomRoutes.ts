import express from "express";
import { authenticate } from "../middlewares/authenticate";

const router = express.Router();

const roomController = require('../controllers/roomController');

router.get('/getRoom/:roomCode', roomController.getRoom);

router.get('/getRoomFeedback/:roomCode', roomController.getRoomFeedback);
router.post('/postRoomFeedback', authenticate, roomController.postRoomFeedback);
router.post('/postRoomAnswersFeedback', roomController.postRoomAnswersFeedback);

router.get('/getRoomMultipleChoice/:roomCode', roomController.getRoomMultipleChoice);
router.post('/postRoomMultipleChoice', authenticate, roomController.postRoomMultipleChoice);
router.post('/postRoomAnswersMultipleChoice', roomController.postRoomAnswersMultipleChoice);

router.get('/getRoomBrainstorming/:roomCode', roomController.getRoomBrainstorming);
router.post('/postRoomBrainstorming', authenticate, roomController.postRoomBrainstorming);
router.post('/postRoomAnswersBrainstorming', roomController.postRoomAnswersBrainstorming);

router.get('/getRoomQuiz/:roomCode', roomController.getRoomQuiz);
router.post('/postRoomQuiz', authenticate, roomController.postRoomQuiz);
router.post('/postRoomAnswersQuiz', roomController.postRoomAnswersQuiz);

module.exports = router;