import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook"
import {useMessage} from "../hooks/message.hook"
import {AuthContext} from "../context/AuthContext"

function AuthPage() {
    const { loading, request, error, clearError } = useHttp()
    const message = useMessage()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const { login } = useContext(AuthContext)

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
       window.M.updateTextFields()
    }, [])

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            login(data.token, data.userId)
        } catch (e) {}
    }

    const formHandler = (e) => {
        if (e.target.value) {
            setForm({ ...form, [e.target.name]: e.target.value})
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Autorization</span>
                    </div>
                    <div className="row ph20">
                        <div className="input-field col s12">
                            <input placeholder="Enter Your email"
                                   id="email"
                                   type="email"
                                   name={"email"}
                                   className="yellow-input"
                                   value={form.email}
                                   onChange={formHandler}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row ph20">
                        <div className="input-field col s12">
                            <input placeholder="Enter Your password"
                                   id="password"
                                   type="password"
                                   name={"password"}
                                   className="yellow-input"
                                   value={form.password}
                                   onChange={formHandler}
                            />
                            <label htmlFor="password">Email</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            onClick={loginHandler}
                            disabled={loading}
                            className={'btn green darken-4 mr-10'}>Login</button>
                        <button
                            onClick={registerHandler}
                            disabled={loading}
                            className={'btn yellow darken-4'}>Registration</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthPage
