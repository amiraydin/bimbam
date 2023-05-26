import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imaz from '../image/quize.gif';

export default function Home() {
    const Navigate = useNavigate();
    const handleQuize = async (e) => {
        e.preventDefault();
        toast('Started !');
        Navigate('/question');
    }
    return (
        <>
            <h1 className='p-3 texst-center'>Home</h1>
            <ToastContainer />
            <div className='text-center m-3 border rounded'>
                <img src={imaz} alt="image quize" className='image-fluide' />
            </div>
            <div className='d-flex justify-content-center'>
                <button className='btn btn-outline-primary' onClick={handleQuize}>Commencer le Quize</button>
            </div>
        </>

    )
}
