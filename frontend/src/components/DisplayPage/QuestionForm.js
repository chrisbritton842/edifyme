import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as Logo } from './logo1.svg';
import { ReactComponent as ExitLogo } from './exit.svg';

function QuestionForm({ onClose }) {
    return (
        <>
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
                        <textarea placeholder='Start your question with "What", "How", "Why", etc.'></textarea>
                    </div>
                </div>
            </div>
            <div className='modal-bottom'>
                <button onClick={onClose}>Cancel</button>
                <button>Add question</button>
            </div>
        </>
    )
}

export default QuestionForm;
