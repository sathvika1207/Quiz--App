import React, { useState } from 'react';
import './Quiz.css';
import { data } from '../assets/data';

const Quiz = () => {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [selectedOption, setSelectedOption] = useState(null);
    let [result, setResult] = useState(null);
    let [score, setScore] = useState(0);
    let [quizCompleted, setQuizCompleted] = useState(false);

    const handleNext = () => {
        if (index < data.length - 1) {
            setIndex(index + 1);
            setQuestion(data[index + 1]);
            setSelectedOption(null);
            setResult(null);
        } else {
            setQuizCompleted(true);
        }
    };

    const checkAns = (ans) => {
        setSelectedOption(ans);
        if (question.ans === ans) {
            setResult('correct');
            setScore(score + 1);
        } else {
            setResult('wrong');
        }
    };

    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            {!quizCompleted ? (
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    <ul>
                        {Array.from({ length: 4 }, (_, i) => {
                            const ans = i + 1;
                            let optionClass = '';
                            if (selectedOption === ans) {
                                optionClass = result === 'correct' ? 'correct' : 'wrong';
                            } else if (result === 'wrong' && question.ans === ans) {
                                optionClass = 'correct';
                            }

                            return (
                                <li
                                    key={ans}
                                    className={`option ${optionClass}`}
                                    onClick={() => checkAns(ans)}
                                >
                                    {question[`option${ans}`]}
                                </li>
                            );
                        })}
                    </ul>
                    <button onClick={handleNext} disabled={selectedOption === null}>Next</button>
                    <div className="index">{index + 1} of {data.length} questions</div>
                </>
            ) : (
                <div className="result">
                    <h2 className={score === data.length ? 'well-done' : 'better-luck'}>
                        {score === data.length ? 'Well done!' : 'Better luck next time!'}
                    </h2>
                    <h3 className="score">Your Score: {score} out of {data.length}</h3>
                    <button onClick={() => window.location.reload()}>Restart Quiz</button>
                </div>
            )}
        </div>
    );
}

export default Quiz;
