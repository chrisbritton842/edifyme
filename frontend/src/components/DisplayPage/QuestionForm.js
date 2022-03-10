import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Logo } from './logo1.svg';
import { ReactComponent as ExitLogo } from './exit.svg';
import * as questionsActions from '../../store/questions';
import { Redirect } from 'react-router-dom';

function QuestionForm({ onClose, modalType, editedQuestionId }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [newQuestion, setNewQuestion] = useState('');
    const [newEdit, setNewEdit] = useState('');

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

    return (
        <>
            <div>
                {modalType === 'edit' && (
                    <div>
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
                                    placeholder='Start your question with "What", "How", "Why", etc.'
                                    value={newEdit}
                                    onChange={e => setNewEdit(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='modal-bottom'>
                            <button onClick={onClose}>Cancel</button>
                            <button onClick={handleEdit}>Edit</button>
                        </div>
                    </div>
                )}
            </div>
            <div>
                {modalType === 'create' && (
                    <div>
                        <div className='modal-top'>
                            <div className='close-div' onClick={onClose}>
                                <ExitLogo />
                            </div>
                            <div className='add-question-div'>
                                <Logo />
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
                                    placeholder='Start your question with "What", "How", "Why", etc.'
                                    value={newQuestion}
                                    onChange={e => setNewQuestion(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className='modal-bottom'>
                            <button onClick={onClose}>Cancel</button>
                            <button onClick={handleAsk}>Add question</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default QuestionForm;
