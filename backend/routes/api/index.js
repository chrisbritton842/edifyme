const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const questionsRouter = require('./questions.js');
const answersRouter = require('./answers');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/questions', questionsRouter);

router.use('/answers', answersRouter);

module.exports = router;
