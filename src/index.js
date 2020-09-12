import React from 'react';
import ReactDOM from 'react-dom';
import GoogleButton from './components/ui/google-button/GoogleButton';
import './static/style.css';


const App = () => (
    <>
        <h1>DigitalOcean Spaces Tutorial</h1>
        <p>Please select a file and submit the form to test an asset to your DigitalOcean Space.</p>

        <form method="post" encType="application/x-www-form-urlencoded"
              action="/files/products/5f5bf757b359480baa9526b1">
            <label htmlFor="file">
                Upload a file
            </label>
            <input id="file" type="file" name="file"/>
            <input type="submit" className="button"/>
        </form>
        <hr/>
        {console.log(process.env.NODE_ENV)}
        <h1>Google Sign In</h1>
        <GoogleButton/>
    </>
);

ReactDOM.render(<App/>, document.getElementById('root'));
