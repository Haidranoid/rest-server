import React from 'react';
import {useHistory} from "react-router-dom"

const Products = () => {
    const history = useHistory();

    return (
        <div>
            Products
            <br/><hr/>

            <button onClick={() => history.push('/')}>ir a home</button>
        </div>
    );
};

export default Products;
