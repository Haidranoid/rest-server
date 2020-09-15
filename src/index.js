import 'regenerator-runtime/runtime.js';
import './config/config'

import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App'
import {Provider} from "react-redux";
import store from "./redux/store/store";

ReactDOM.render(
    <Provider store={store}>
        {console.log(process.env.NODE_ENV)}
        <App/>
    </Provider>, document.getElementById('root'));
