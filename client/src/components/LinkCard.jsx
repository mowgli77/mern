import React from 'react'

export const LinkCard = ({ link }) => {

    return <>
    <h2>This Link</h2>
        <p>Link to <a href={link.to} target={'_blank'} rel={'noopener noreferrer'}>{link.to}</a></p>
        <p>Link from <a href={link.from} target={'_blank'} rel={'noopener noreferrer'}>{link.from}</a></p>
        <p>Clicks: <strong>{link.clicks}</strong></p>
        <p>Clicks: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
    </>

}