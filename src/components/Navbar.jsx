import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const Navigate = useNavigate()
    const logedin = sessionStorage.getItem('user');

    function logout() {
        sessionStorage.removeItem('user');
        Navigate('/');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 m-3 border rounded">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"> Login</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {logedin && <a className="nav-link active" aria-current="page" href="/home">Home</a>}
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/tondeuse">Tondeuse</a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" >Search</button>
                    </form>
                    {logedin && <button className="btn btn-outline-danger text-end ms-5" aria-current="page" onClick={logout} >Logout</button>}
                </div>
            </div>
        </nav>
    )
}
