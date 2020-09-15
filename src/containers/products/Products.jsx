import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom"
import useRequest from "../../hooks/use-request/useRequest";

const Products = () => {
    const [products,setProducts] = useState([]);
    const request = useRequest('/products');

    useEffect(() => {
        fetchData();
    },[]);
    const fetchData = async () => {
        const {data} = await request.get();
        setProducts(data.response);
    };

    return (
        <div>
            Products
            <br/><hr/>
            {products.length !== 0 && products.map(product => <div key={product._id}>
                <hr/>
                <p>{product.description}</p>
                <img src={product.img} alt={"Image not found"}/>
                <hr/>
            </div>)}

            <Link to={"/"}>
                ir a home
            </Link>
        </div>
    );
};

export default Products;
