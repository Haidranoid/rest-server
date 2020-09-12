import axios from 'axios';

export const onSignIn = googleUser => {
    const profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token;

    const response = axios.post('/login/google', {
        id_token,
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    console.log(response)
};

export const signOut = () => {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
};
