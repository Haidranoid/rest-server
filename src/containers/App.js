import React from 'react';
import {Helmet} from "react-helmet";

const App = () => (
    <>
        <Helmet>
            <meta charSet="UTF-8"/>
            <meta name="google-signin-client_id"
                  content="87153146962-sjmk25mnuv3o23mes72jnduvpitavgtm.apps.googleusercontent.com"/>
        </Helmet>

        <div className="text-color">Hello World</div>
        <img src="static/bear.jpg" alt="not found" width="450px" height="450px"/>
    </>
);
