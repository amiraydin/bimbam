import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function First() {
    const [question, setQuestion] = useState([]);
    const [answer, setAnswer] = useState([]);
    // toast('Bienvenue !');
    async function getQuestions() {
        try {
            const res = await axios.get(`http://localhost/lproERPFAmai2023/api/get-question.php?key=iot1235&id=${2}`);
            const resault = res.data;
            setQuestion(resault.question);
            setAnswer(resault.answer)
            // console.log(res.data);
        } catch (error) {
            toast(error)
        }
    }
    useEffect(() => {
        getQuestions();
    }, [])
    console.log('question', question);
    console.log('answer', answer);
    return (
        <div>
            <div>
                <ToastContainer />
            </div>
            <div className='m-3'>
                <h1>
                    Questions
                </h1>
            </div>
            {question && <>
                <div className='container test-center'>
                    <h4 className='text-center'>
                        Question numero {question.id}
                    </h4>
                    <br />
                    <h2 className='text-center'>
                        {question.texte}
                    </h2>
                </div>
            </>}

            <div>
                {answer && answer.map((key, index) => (
                    <div className='d-flex justify-content-center align-items-baseline m-3' key={index}>
                        <h5 >{index + 1}</h5>
                        <h5 className='me-3'>-</h5>
                        <button className='btn btn-outline-primary'>{key.texte}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
