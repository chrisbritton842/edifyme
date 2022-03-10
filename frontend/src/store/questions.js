import { csrfFetch } from "./csrf";

const SET_QUESTIONS = 'questions/setQuestion';

const setQuestions = (questions) => {
    return {
        type: SET_QUESTIONS,
        payload: questions
    };
};

export const createAnswer = ({ questionId, answer }) => async (dispatch) => {
    await csrfFetch('/api/answers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            questionId: questionId,
            answer: answer
        })
    });

    const allQuestions = await csrfFetch('/api/questions');
    const data = await allQuestions.json();
    dispatch(setQuestions(data));
    return allQuestions;
};

export const updateAnswer = ({ answerId, newAnswer }) => async (dispatch) => {
    await csrfFetch(`/api/answers/${answerId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newAnswer: newAnswer
        })
    });

    const allQuestions = await csrfFetch('/api/questions');
    const data = await allQuestions.json();
    dispatch(setQuestions(data));
    return allQuestions;
};

export const deleteAnswer = (answerId) => async (dispatch) => {
    await csrfFetch(`/api/answers/${answerId}`, { method: 'DELETE'})

    const allQuestions = await csrfFetch('/api/questions');
    const data = await allQuestions.json();
    dispatch(setQuestions(data));
    return allQuestions;
};

export const createQuestion = ({ newQuestion }) => async (dispatch) => {
    await csrfFetch('/api/questions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            question: newQuestion
        })
    });

    const allQuestions = await csrfFetch('/api/questions');
    const data = await allQuestions.json();
    dispatch(setQuestions(data));
    return allQuestions;
};

export const readQuestions = () => async (dispatch) => {
    const allQuestions = await csrfFetch('/api/questions');
    const data = await allQuestions.json();
    dispatch(setQuestions(data));
    return allQuestions;
}

export const updateQuestion = ({ newEdit, editedQuestionId }) => async (dispatch) => {
    await csrfFetch(`/api/questions/${editedQuestionId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            question: newEdit
        })
    });

    const allQuestions = await csrfFetch('/api/questions');
    const data = await allQuestions.json();
    dispatch(setQuestions(data));
    return allQuestions;
};

export const deleteQuestion = (questionId) => async (dispatch) => {
    await csrfFetch(`/api/questions/${questionId}`, { method: 'DELETE'});

    const allQuestions = await csrfFetch('/api/questions');
    const data = await allQuestions.json();
    dispatch(setQuestions(data));
    return allQuestions;
}

const initialState = {};

const questionsReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_QUESTIONS:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        default:
            return state;
    }
};

export default questionsReducer;
