const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth')

const { Question } = require('../../db/models')

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const questions = await Question.findAll();

    return res.json({ questions: questions });
}));

router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const { id } = jwtPayload.data;
    const { question } = req.body;

    const newQuestion = await Question.create({ ownerId: id, question: question });

    return res.json({ newQuestion: newQuestion });
}));

router.put('/:questionId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.questionId, 10);

    const { question } = req.body;
    const updatedQuestion = await Question.findByPk(questionId);

    updatedQuestion.question = question;

    await updatedQuestion.save();

    return res.json({ updatedQuestion: updatedQuestion });
}));

router.delete('/:questionId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.questionId, 10);

    const doomedQuestion = await Question.findByPk(questionId);

    await doomedQuestion.destroy();

    return res.json({})
}));



module.exports = router;
