import React, { useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { GoogleLogout } from 'react-google-login'
import { gapi, loadAuth2 } from 'gapi-script'

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

const LibOAuth = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        loadAuth2(gapi, clientId, '').then(res => console.log(res))
    }, [])

    const handleSuccess = res => {
        console.log('Login success! Current user: ', res.profileObj)
        setUser(res.profileObj)
    }

    const handleFailure = res => {
        console.log('Login failed!')
    }

    const handlLogout = () => {
        console.log('Logged out!')
        setUser(null)
    }

    return (
        <>
            <div>
                <GoogleLogin
                    clientId={clientId}
                    buttonText='Login'
                    onSuccess={handleSuccess}
                    onFailure={handleFailure}
                    cookiePolicy={'single_host_origin'}
                />
            </div>

            <div>
                <GoogleLogout
                    clientId={clientId}
                    buttonText='Logout'
                    onLogoutSuccess={handlLogout}
                />
            </div>

            {user && (
                <>
                    <img src={user.imageUrl} alt='Profile' />
                    <p>{user.email}</p>
                    <p>{user.name}</p>
                </>
            )}
        </>
    )
}

export default LibOAuth