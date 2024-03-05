import express from "express";

const router = express.Router();

const sessionController = require('../controllers/sessionController');

router.post('/registerUser', sessionController.registerUser);
router.post('/loginUser', sessionController.loginUser);
router.post('/changePassword', sessionController.changePassword);

module.exports = router