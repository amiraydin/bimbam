import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';
export default function First() {
    // const Navigate = useNavigate();
    const [question, setQuestion] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [score, setScore] = useState(0);
    const [nextQ, setNextQ] = useState(1);
    // const [bonResponse, setBonResponse] = useState(null);
    // toast('Bienvenue !');
    async function handleR(r) {
        // console.log('reponse', r);
        if (r == 1) {
            setScore(score + 1);
        }
        setNextQ(nextQ + 1);
        const res = await axios.get(`http://localhost/lproERPFAmai2023/api/get-question.php?key=iot1235&id=${nextQ}`);
        const resault = res.data;
        setQuestion(resault.question);
        setAnswer(resault.answer);
        if (nextQ === 10) {
            setNextQ(1);
            toast(`vous avez fini ! votre score est : ${score}`);
            // Navigate('/question');
        }
    }
    async function getPremierQ() {
        const res = await axios.get(`http://localhost/lproERPFAmai2023/api/get-question.php?key=iot1235&id=${1}`);
        const resault = res.data;
        setQuestion(resault.question);
        setAnswer(resault.answer);
    }
    // async function nextQuestion() {
    //     try {
    //         let i = 1;
    //         // setTimeout(() => {
    //         const res = await axios.get(`http://localhost/lproERPFAmai2023/api/get-question.php?key=iot1235&id=${i}`);
    //         const resault = res.data;
    //         setQuestion(resault.question);
    //         setAnswer(resault.answer);
    //         i += 1;
    //         // setNextQ(false);
    //         // }
    //         //     , 3000);
    //         if (i === 10) {
    //             i = 0;
    //             toast(`vous avez fini ! votre score est : ${score}`);
    //         }
    //     } catch (error) {
    //         toast(error)
    //     }
    // }
    useEffect(() => {
        getPremierQ();
    }, [])
    // console.log('question', question);
    // console.log('answer', answer);
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
                        Question numero {question && question.id} <br /> <i class="fas fa-user-graduate"></i>
                    </h4>
                    <br />
                    <h2 className='text-center'>
                        {question && question.texte}
                    </h2>
                </div>
            </>}
            <div>
                {answer && answer.map((key, index) => (
                    <div className='d-flex justify-content-center align-items-baseline m-3' key={index}>
                        <h5 >{index + 1}</h5>
                        <h5 className='me-3'>-</h5>
                        <button onClick={() => handleR(key.is_right)} className='btn btn-outline-primary'>{key.texte}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
