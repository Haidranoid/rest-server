import React, {useState} from "react";
import {useDispatch} from "react-redux";
import useRequest from "../../hooks/use-request/useRequest";
import * as authActions from '../../redux/actions/authAction'
import {Link} from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch();
    const request = useRequest('/login');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        dispatch(authActions.loginStarted());
        try {
            const {data} = await request.post({email, password});
            dispatch(authActions.loginCompleted(data))
        } catch (e) {
            dispatch(authActions.loginFailed(e.message))
        }
    };

    return (
        <div>
            {console.log(process.env.NODE_ENV)}
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
            <hr/>
            <div>
                <h1>login</h1>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="text" value={password} onChange={e => setPassword(e.target.value)}/>
                <button onClick={handleLogin}>submit</button>
            </div>
            <Link to={"/products"}>
                ir a productos
            </Link>
        </div>
    )
};

export default Home;
