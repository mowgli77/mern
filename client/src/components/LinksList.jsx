import React from 'react'
import {Link} from "react-router-dom";

export const LinksList = ({ links }) => {

    return <>
            <h2>Links</h2>
        { links.length ?
        <table>
            <thead>
            <tr>
                <th>N</th>
                <th>Original Link</th>
                <th>Cutted Link</th>
                <th>Open Link</th>
            </tr>
            </thead>
            <tbody>

            { links.map((link, index) => <tr key={link._id}>
                <td>{index + 1}</td>
                <td>{link.from}</td>
                <td>{link.to}</td>
                <td><Link to={`/details/${link._id}`}>Open</Link></td>
            </tr>)}
            </tbody>
        </table>
        : <p>You have not links yet</p> }
    </>

}