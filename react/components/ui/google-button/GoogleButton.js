import React from "react";
import {GoogleLogin, GoogleLogout} from "react-google-login";
import {onSignIn, onSignOut} from "../../../lib/functions/google";

const GoogleButton = () => {
    return (
        <div>
            <GoogleLogin clientId={"87153146962-sjmk25mnuv3o23mes72jnduvpitavgtm.apps.googleusercontent.com"}
                         onSuccess={onSignIn}
                         onFailure={err => console.log(err)}
                         cookiePolicy={'single_host_origin'}>

            </GoogleLogin>
            <GoogleLogout clientId={"87153146962-sjmk25mnuv3o23mes72jnduvpitavgtm.apps.googleusercontent.com"}
                          buttonText='Logout'
                          onLogoutSuccess={onSignOut}
                          onFailure={err => console.log(err)}/>
        </div>
    )
};

export default GoogleButton;
