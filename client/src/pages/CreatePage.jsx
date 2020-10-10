import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext"
import {useHttp} from "../hooks/http.hook";

function CratePage() {

    const [link, setLink] = useState(null)
    const { request } = useHttp()
    const { token } = useContext(AuthContext)
    const history = useHistory()

    useEffect(() => {
        window.M.updateTextFields()
    }, [])


    const keyPressHandler = async e => {
        if (e.key === 'Enter') {
            const data = await request('/api/link/generate', 'POST', {from: link}, {Authorization: `Bearer ${token}`})
            history.push(`/details/${data.link._id}`)
        }
    }

  return (
    <div className="container">
        <div className="col s-8 offset-s2">
                <div className="input-field col s12">
                    <input placeholder="Enter Your password"
                           id="link"
                           type="text"
                           name={"link"}
                           value={link}
                           onChange={e => setLink(e.target.value)}
                           onKeyPress={keyPressHandler}
                    />
                    <label htmlFor="link">Create cut link</label>
            </div>
        </div>
    </div>
  );
}

export default CratePage
