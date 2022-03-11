import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import QuestionForm from './QuestionForm';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ReactComponent as QuestionIcon } from './logo1.svg';
import { ReactComponent as AnswerIcon } from './answer.svg';
import * as questionsActions from '../../store/questions';
import * as usersActions from '../../store/users';

function DisplayPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);
    const [showMenu, setShowMenu] = useState(null);
    const [showAnswerMenu, setShowAnswerMenu] = useState(null)
    const [modalType, setModalType] = useState('');
    const [editedQuestionId, setEditedQuestionId] = useState(null)
    const [answerDisplay, setAnswerDisplay] = useState(false)
    const { questions } = useSelector(state => state.questions);
    const { users } = useSelector(state => state.users);
    console.log("Users: ", users)
    console.log("Questions: ", questions)
    console.log("Session User: ", sessionUser)



    useEffect(() => {
        return dispatch(usersActions.readUsers())
    }, [dispatch])


    useEffect(() => {
        return dispatch(questionsActions.readQuestions())

    }, [dispatch])

    const handleCreate = () => {
        setModalType('create');
        setShowModal(true);
    };

    const handleEdit = (questionId) => {
        setModalType('edit');
        setEditedQuestionId(questionId);
        setShowModal(true);
    };

    const handleDelete = (questionId) => {
        return dispatch(questionsActions.deleteQuestion(questionId));
    };


    if (!sessionUser) return (
        <Redirect to='/login' />
    )

    return (
        <>
            <div>
                <div className='main-ask-head'></div>
                <div className='top-ask-button' onClick={handleCreate}>What do you want to ask or share?</div>
                <div className='bottom-ask-button' onClick={handleCreate}>
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
                            <button className='answer-button' onClick={() => setAnswerDisplay(!answerDisplay)}>Answer</button>
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
                                    <div onClick={() => handleEdit(item.id)}>Edit</div>
                                </li>
                                <li>
                                    <div></div>
                                    <div onClick={() => handleDelete(item.id)}>Delete</div>
                                </li>
                            </ul>
                        )}
                    </div>
                    {answerDisplay && (
                        <div>
                            <div className='top-answer-section'>
                                <div></div>
                                <div>
                                    <textarea></textarea>
                                </div>
                                <div>
                                    <button></button>
                                </div>
                            </div>
                            <div className='answer-display'>
                                {item.Answers.map(answer => (
                                    <div>
                                        <div className='answer-person-face'></div>
                                        <div className='answer-person-name'></div>
                                        <div className='drop-down-answer'></div>
                                        <div className='drop-down-answer-bar'>
                                            <div>
                                                {sessionUser.id === answer.userId && (
                                                    <button onClick={() => setShowAnswerMenu(answer.id)}>
                                                    svg
                                                    </button>
                                                )}
                                            </div>
                                            {showAnswerMenu === answer.id && (
                                                <ul className='answer-button-drop-down'>
                                                    <li>
                                                        <div></div>
                                                        <div onClick={() => handleAnswerEdit(answer.id)}>Edit</div>
                                                    </li>
                                                    <li>
                                                        <div></div>
                                                        <div onClick={() => handleAnswerDelete(answer.id)}>Delete</div>
                                                    </li>
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}







            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <QuestionForm onClose={() => setShowModal(false)} modalType={modalType} editedQuestionId={editedQuestionId}/>
                </Modal>
            )}
        </>
    )
}

export default DisplayPage;
