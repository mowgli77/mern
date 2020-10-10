import React, {useContext} from 'react'
import {NavLink, useHistory} from "react-router-dom"
import {AuthContext} from "../context/AuthContext"

export const Navbar = () => {

    const { logout } = useContext(AuthContext)
    let history = useHistory()

    const logoutHandler = () => {
        logout()
        history.push("/")
    }

    return <nav>
        <div class="nav-wrapper blue darken-1 ph20">
            <span class="brand-logo">Links Cutter</span>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><NavLink to="/create">Create</NavLink></li>
                <li><NavLink to="/links">Links</NavLink></li>
                <li><NavLink to="/" onClick={logoutHandler}>Exit</NavLink></li>
            </ul>
        </div>
    </nav>
}