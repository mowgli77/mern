import {useCallback, useEffect, useState} from "react"

const AUTH_DATA = 'AUTH_DATA'
export const useAuth = () => {

    const [token, setToken] = useState()
    const [userId, setUserId] = useState()
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(AUTH_DATA, JSON.stringify({
            token: jwtToken, userId: id
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)

        localStorage.removeItem(AUTH_DATA)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(AUTH_DATA))
        if (data && data.token) {
            login(data.token, data.userId)
        }
        setReady(true)
    }, [login])

    return { login, logout, token, userId, ready }
}