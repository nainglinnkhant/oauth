import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'

const OrgOAuth = () => {
    const [user, setUser] = useState(null)

    const handleCredentialResponse = response => {
        console.log('Encoded JWT ID token: ' + response.credential)
        setUser(jwtDecode(response.credential))
        document.getElementById('buttonDiv').hidden = true
    }

    const handleSignOut = () => {
        setUser(null)
        document.getElementById('buttonDiv').hidden = false
    }
    
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse
        })

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: 'outline', size: 'large' }
        )

        google.accounts.id.prompt()
    }, [])

    return (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
            <div style={{ display: 'inline-block' }}>
                <div id='buttonDiv'></div>
            </div>

            {user && (
                <div style={{ display: 'inline-block' }}>
                    <img src={user.picture} alt='Profile' style={{ borderRadius: '50%' }} />
                    <p>{user.email}</p>
                    <p>{user.name}</p>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            )}
        </div>
    )
}

export default OrgOAuth