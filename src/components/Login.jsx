import React, { useState, useEffect } from 'react';
import axios, { formToJSON } from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const baseURL = "http://localhost/lproERPFAmai2023";

export default function Login() {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const Navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        // console.log('user', user);
        // console.log('pass', pass);
        try {
            let connect = null;
            let i = 0;
            while (allUsers.length > i) {
                const person = allUsers[i];
                if (person.username === user && person.password === pass) connect = 1;
                i++;
            }
            if (connect === 1) {
                addItem('user', user);
                Navigate("/home");
            } else {
                toast('User ou Mot de passe incorrect !');
            }
        } catch (err) {
            console.log("here is erreur !", err)
        }
    };
    function addItem(sn, tb) {
        return window.sessionStorage.setItem(sn, tb);
    }

    async function getUser() {
        try {
            const reponse = await axios.get('http://localhost/lproERPFAmai2023/api/get-users.php?key=iot1235&token=0e700c97a56f97b1643f66bdbbedee54');
            formToJSON(reponse.data);
            setAllUsers(reponse.data);
            // console.log(reponse);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
    }, [])
    var passe = document.getElementById('passinput');
    var toggEye = document.getElementById('togeye');
    if (toggEye) toggEye.onclick = () => {
        if (passe.type === 'password') {
            toggEye.className = toggEye.className.replace('fa-eye-slash', 'fa-eye');
            // toggEye.classList.remove('fa-eye');
            // toggEye.classList.add('fa-eye-slash');
            passe.setAttribute('type', 'text');
        } else {
            toggEye.className = toggEye.className.replace('fa-eye', 'fa-eye-slash');
            // toggEye.classList.remove('fa-eye-slash');
            // toggEye.classList.add('fa-eye');
            passe.setAttribute('type', 'password');
        }
    };
    // console.log(allUsers);

    return (
        <section className="">
            <div className="container">
                <ToastContainer />
                <div className="row d-flex justify-content-center align-items-center">
                    {/* <div className="col-md-9 col-lg-6 col-xl-5">
                                <img src="uploads/logo-iutv.png" className="img-fluid" alt="Sample image" />
                            </div> */}
                    <div className="col-md-10 col-lg-8 col-xl-6 offset-xl-1 mt-4 p-4">
                        <form action="" onSubmit={onSubmit} method="post" encType="multipart/form-data">
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3mail">User </label>
                                <input type="text" name="user" id="form3mail" onChange={e => { setUser(e.target.value) }} className="form-control form-control-lg" placeholder="Entrez votre username " />
                            </div>
                            <div className="form-outline mb-3 position-relative">
                                <label className="form-label" htmlFor="passinput">Mot de passe</label>
                                <input id="passinput" type="password" name="Passe" onChange={e => { setPass(e.target.value) }} className="form-control form-control-lg" placeholder="Entrez votre mot de passe" />
                                <span><i id="togeye" className="fas fa-eye-slash position-absolute top-50 end-0 p-2 pe-3" role="button"></i></span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                    <label className="form-check-label" htmlFor="form2Example3">
                                        Se souvenir de moi
                                    </label>
                                </div>
                                <a href="#!" className="text-body">Forgot password?</a>
                            </div>
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-outline-info btn-lg" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Se connecter</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
