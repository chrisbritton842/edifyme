import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import QuestionForm from './QuestionForm';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ReactComponent as QuestionIcon } from './logo1.svg';
import { ReactComponent as AnswerIcon } from './answer.svg';
import * as questionsActions from '../../store/questions';

function DisplayPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);
    const [showMenu, setShowMenu] = useState(null);
    const { questions } = useSelector(state => state.questions);
    console.log("Questions: ", questions)
    console.log("Session User: ", sessionUser)

    const handleClick = (questionId) => {
        return dispatch(questionsActions.deleteQuestion(questionId));
    };


    if (!sessionUser) return (
        <Redirect to='/login' />
    )

    return (
        <>
            <div>
                <div className='main-ask-head'></div>
                <div className='top-ask-button' onClick={() => setShowModal(true)}>What do you want to ask or share?</div>
                <div className='bottom-ask-button' onClick={() => setShowModal(true)}>
                    <QuestionIcon />
                    Ask
                </div>
                <div className='answer-button'>
                    <AnswerIcon />
                    Answer
                </div>
            </div>
            {questions?.map(item => (
                <div className='question-container'>
                    <div className='question-top'>
                        <div className='user-image'></div>
                        <span>{item.User.username}</span>
                        <span>{item.User.personalDescription}</span>
                    </div>
                    <div className='question-section'>
                        <span>{item.question}</span>
                    </div>
                    <div className='answers-section'>
                        <span>{item.Answers[0]?.answer}</span>
                    </div>
                    <div className='bottom-bar'>
                        <div className='answer-button-div'>
                            <button className='answer-button'>Answer</button>
                        </div>
                        <div>
                            {sessionUser.id === item.ownerId && (
                                <button onClick={() => setShowMenu(item.id)}>
                                    svg
                                </button>
                            )}
                        </div>
                        {showMenu === item.id && (
                            <ul className='profile-dropdown'>
                                <li>
                                    <div></div>
                                    <div>Edit</div>
                                </li>
                                <li>
                                    <div></div>
                                    <div onClick={() => handleClick(item.id)}>Delete</div>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            ))}







            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <QuestionForm onClose={() => setShowModal(false)}/>
                </Modal>
            )}
        </>
    )
}

export default DisplayPage;
