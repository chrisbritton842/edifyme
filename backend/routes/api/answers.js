const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth')

const { Question, User, Answer } = require('../../db/models')

const router = express.Router();

router.get('/', requireAuth, asyncHandler(async (req, res) => {
    const answers = await Answer.findAll({
        include: [
            {
                model: User
            },
            {
                model: Question
            }
        ]
    });

    return res.json({ answers: answers });
}));

router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const { id } = req.user;

    const { questionId, answer } = req.body;

    const newAnswer = await Answer.create({ userId: id, questionId: questionId, answer: answer })

    return res.json({ newAnswer: newAnswer });
}));

router.put('/:answerId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const answerId = parseInt(req.params.answerId, 10);

    const { newAnswer } = req.body;

    const updatedAnswer = await Answer.findByPk(answerId);

    updatedAnswer.answer = newAnswer;

    await updatedAnswer.save();

    return res.json({ updatedAnswer: updatedAnswer });

}));

router.delete('/:answerId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const answerId = parseInt(req.params.answerId, 10);

    const doomedAnswer = await Answer.findByPk(answerId);

    await doomedAnswer.destroy();

    return res.json({});
}))

module.exports = router;
