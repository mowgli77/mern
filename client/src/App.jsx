import React from 'react'
import {BrowserRouter} from "react-router-dom"
import 'materialize-css'
import {useRouter} from "./routes"
import {useAuth} from "./hooks/auth.hook"
import {AuthContext} from "./context/AuthContext"
import {Navbar} from "./components/Navbar"
import {Loader} from "./components/Loader";


function App() {

    const {login, logout, token, userId, ready} = useAuth()
    const isAuth = !!token
    const router = useRouter(isAuth)

    if (!ready) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{ login, logout, token, userId, isAuth }}>
            <BrowserRouter>
                { isAuth && <Navbar /> }
                <div className="container">
                    {router}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App
