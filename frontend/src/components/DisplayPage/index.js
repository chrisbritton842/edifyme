import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import QuestionForm from './QuestionForm';
import { useDispatch, useSelector, } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ReactComponent as QuestionIcon } from './logo1.svg';
import { ReactComponent as AnswerIcon } from './answer.svg';

function DisplayPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);
    const { questions } = useSelector(state => state.questions);
    console.log("Questions: ", questions)
    console.log("Session User: ", sessionUser)

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
                        <span>{item.Question.question}</span>
                    </div>
                    <div className='answers-section'>
                        <span>{item.answer}</span>
                    </div>
                    <div className='bottom-bar'>
                        
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
