import React, {useState} from "react";
import useRequest from "../../hooks/use-request/useRequest";

const Home = () => {
    const request = useRequest('/login');

    const [email, setEmail] = useState('haidranoid16@hotmail.com');
    const [password, setPassword] = useState('123456');

    const handleLogin = async () => {
        const response = await request.post({email, password});
        console.log(response)
    };

    return (
        <div>
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
                <h1>
                    login
                </h1>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="text" value={password} onChange={e => setPassword(e.target.value)}/>
                <button onClick={handleLogin}>submit</button>
            </div>
        </div>
    )
};

export default Home;
