import React from 'react';
import {useHistory} from "react-router-dom"
import useRequest from "../../hooks/use-request/useRequest";

const Products = () => {
    const history = useHistory();
    const request = useRequest('/products');
    return (
        <div>
            Products
            <br/><hr/>

            <button onClick={() => history.push('/')}>ir a home</button>
        </div>
    );
};

export default Products;
