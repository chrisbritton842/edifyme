import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import QuestionForm from './QuestionForm';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ReactComponent as AnswerIcon } from './answer.svg';
import { ReactComponent as EditIcon } from './edit.svg';
import * as questionsActions from '../../store/questions';
import * as usersActions from '../../store/users';
import * as sessionActions from '../../store/session';
import Navigation from '../Navigation';
import './DisplayPage.css';
import head from './head.png';

function DisplayPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false);
    const [showMenu, setShowMenu] = useState(null);
    const [showMenuBool, setShowMenuBool] = useState(false);
    const [showAnswerMenu, setShowAnswerMenu] = useState(null)
    const [modalType, setModalType] = useState('');
    const [editedQuestionId, setEditedQuestionId] = useState(null);
    const [editedAnswerId, setEditedAnswerId] = useState(null);
    const [editedAnswerItem, setEditedAnswerItem] = useState(null);
    const [answerDisplay, setAnswerDisplay] = useState(false);
    const [answerToggleId, setAnswerToggleId] = useState(null);
    const [answerText, setAnswerText] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const { questions } = useSelector(state => state.questions);
    const { users } = useSelector(state => state.users);


    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

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

    const handleAnswerEdit = (answerId, itemId) => {
        setModalType('answerEdit');
        setEditedAnswerId(answerId);
        setEditedAnswerItem(itemId);
        setShowModal(true);
    };

    const handleAnswerDelete = (answerId) => {
        return dispatch(questionsActions.deleteAnswer(answerId));
    };

    const handleAnswerToggle = (questionId) => {
        setAnswerDisplay(!answerDisplay)
        setAnswerToggleId(questionId)
    };

    const handleAnswer = (itemId) => {
        if (answerText) return dispatch(questionsActions.createAnswer({ questionId: itemId, answer: answerText }))
    };

    const handleOnChange = (e) => {
        setAnswerText(e.target.value)
    };


    if (!sessionUser) return (
        <Redirect to='/login' />
    )

    return (
        <>
            <Navigation isLoaded={isLoaded} />
            <div className='display-page-container'>
                <div className='left-column'></div>

                <div className='display-page-content-container'>
                    <div className='top-question-container'>
                        <div className='ask-head-div'>
                            <img className='main-ask-head' src={head} alt='Logo' />
                            <div className='top-ask-button' onClick={handleCreate}>
                                <div className='top-ask-btn-text'>What do you want to ask or share?</div>
                            </div>
                        </div>
                    </div>
                    {questions?.map(item => (
                        <div key={item.id} className='question-container'>
                            <div className='question-top'>
                                <div className='user-image'></div>
                                <span>{item.User?.username}</span>
                                <span>{item.User?.personalDescription}</span>
                            </div>
                            <div className='question-section'>
                                <span>{item.question}</span>
                            </div>
                            <div className='answers-section'>
                                <span>{item.Answers[0]?.answer}</span>
                            </div>
                            <div className='bottom-bar'>
                                <div className='answer-button-div'>
                                    <button className='answer-button' onClick={() => handleAnswerToggle(item.id)}>
                                        <AnswerIcon />
                                    </button>
                                </div>
                                <div className='question-edit-button-div'>
                                    {sessionUser.id === item.ownerId && (
                                        <button className='question-edit-button' onClick={() => {
                                            setShowMenu(item.id);
                                            setShowMenuBool(!showMenuBool);
                                            }}>
                                            <EditIcon />
                                        </button>
                                    )}
                                </div>
                                {showMenu === item.id && showMenuBool && (
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
                            {answerDisplay && answerToggleId === item.id && (
                                <div>
                                    <div className='top-answer-section'>
                                        <div className='answer-head-div'>
                                            <img className='answer-head' src={head} alt='Logo'/>
                                        </div>
                                        <div className='top-answer-div'>
                                            <textarea
                                                className='top-answer-input-field'
                                                value={answerText}
                                                onChange={handleOnChange}
                                            ></textarea>
                                        </div>
                                        <div className='top-answer-submit-div'>
                                            <button className='top-answer-submit-btn' onClick={() => handleAnswer(item.id)}>
                                                <div className='top-answer-btn-text'>Answer Question</div>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='answer-display'>
                                        {item.Answers.map(answer => (
                                            <div key={answer.id}>
                                                <div className='answer-person-face'></div>
                                                <div className='answer-person-name'>
                                                    {users.find(user => user.id === answer.userId).username}
                                                </div>
                                                <div className='drop-down-answer'>
                                                    {answer.answer}
                                                </div>
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
                                                                <div onClick={() => handleAnswerEdit(answer.id, answer.questionId)}>Edit</div>
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
                </div>
                <div className='right-column'></div>
            </div>




            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <QuestionForm onClose={() => setShowModal(false)} modalType={modalType} editedQuestionId={editedQuestionId} editedAnswerId={editedAnswerId} editedAnswerItem={editedAnswerItem} />
                </Modal>
            )}
        </>
    )
}

export default DisplayPage;
