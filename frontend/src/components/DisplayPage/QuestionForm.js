import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as ExitLogo } from './exit.svg';
import * as questionsActions from '../../store/questions';
import { Redirect } from 'react-router-dom';
import './QuestionForm.css';

function QuestionForm({ onClose, modalType, editedQuestionId, editedAnswerId, editedAnswerItem }) {
    const dispatch = useDispatch();
    const { questions } = useSelector(state => state.questions);
    const sessionUser = useSelector(state => state.session.user);
    const [newQuestion, setNewQuestion] = useState('');
    const [newEdit, setNewEdit] = useState(editedQuestionId ? questions.find(question => question.id === editedQuestionId)?.question : '');
    const [answerEdit, setAnswerEdit] = useState(editedAnswerId && editedAnswerItem ? questions.find(question => question.id === editedAnswerItem).Answers.find(answer => answer.id === editedAnswerId)?.answer : '');

    if (!sessionUser) return (
        <Redirect to='/login' />
    );

    const handleEdit = () => {
        onClose();
        return dispatch(questionsActions.updateQuestion({ newEdit, editedQuestionId }))
    }

    const handleAsk = () => {
        if (newQuestion) {
            onClose();
            return dispatch(questionsActions.createQuestion({ newQuestion }))
        }
    };

    const handleAnswerEdit = () => {
        onClose();
        return dispatch(questionsActions.updateAnswer({ answerId: editedAnswerId, newAnswer: answerEdit }))
    };

    return (
        <>
            <div>
                {modalType === 'edit' && (
                    <div className='modal-container'>
                        <div className='modal-top'>
                            <div className='close-div' onClick={onClose}>
                                <ExitLogo />
                            </div>
                            <div className='add-question-div'>
                                Edit Question
                            </div>
                        </div>
                        <div className='modal-middle'>
                            <div className='inner-modal-middle'>
                                <div className='inner-icon-div'>
                                    <div className='circle-icon'></div>
                                </div>
                                <div className='text-area-div'>
                                    <textarea
                                    className='text-area-field'
                                    placeholder='Start your question with "What", "How", "Why", etc.'
                                    value={newEdit}
                                    onChange={e => setNewEdit(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='modal-bottom'>
                            <button className='modal-cancel-btn' onClick={onClose}>Cancel</button>
                            <button className='modal-edit-btn' onClick={handleEdit}>
                                <div className='modal-edit-btn-text'>Edit</div>
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div>
                {modalType === 'create' && (
                    <div className='modal-container'>
                        <div className='modal-top'>
                            <div className='close-div' onClick={onClose}>
                                <ExitLogo />
                            </div>
                            <div className='add-question-div'>
                                Add Question
                            </div>
                        </div>
                        <div className='modal-middle'>
                            <div className='inner-modal-middle'>
                                <div className='inner-icon-div'>
                                    <div className='circle-icon'></div>
                                </div>
                                <div className='text-area-div'>
                                    <textarea
                                    className='text-area-field'
                                    placeholder='Start your question with "What", "How", "Why", etc.'
                                    value={newQuestion}
                                    onChange={e => setNewQuestion(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='modal-bottom'>
                            <button className='modal-cancel-btn' onClick={onClose}>Cancel</button>
                            <button className='modal-edit-btn' onClick={handleAsk}>
                                <div className='modal-edit-btn-text'>Add question</div>
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div>
                {modalType === 'answerEdit' && (
                    <div className='modal-container'>
                        <div className='modal-top'>
                            <div className='close-div' onClick={onClose}>
                                <ExitLogo />
                            </div>
                            <div className='add-question-div'>
                                Edit Answer
                            </div>
                        </div>
                        <div className='modal-middle'>
                            <div className='inner-modal-middle'>
                                <div className='inner-icon-div'>
                                    <div className='circle-icon'></div>
                                </div>
                                <div className='text-area-div'>
                                    <textarea
                                    className='text-area-field'
                                    placeholder='Start your question with "What", "How", "Why", etc.'
                                    value={answerEdit}
                                    onChange={e => setAnswerEdit(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='modal-bottom'>
                            <button className='modal-cancel-btn' onClick={onClose}>Cancel</button>
                            <button className='modal-edit-btn' onClick={handleAnswerEdit}>
                                <div className='modal-edit-btn-text'>Edit</div>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default QuestionForm;
