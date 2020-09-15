import React,{useEffect} from 'react';
import {Link} from "react-router-dom"
import useRequest from "../../hooks/use-request/useRequest";

const Products = () => {
    const request = useRequest('/categories');

    useEffect(() => {
        fetchData();
    },[]);
    const fetchData = async () => {
        const {data} = await request.get();
        console.log(data)
    };

    return (
        <div>
            Products
            <br/><hr/>

            <Link to={"/"}>
                ir a home
            </Link>
        </div>
    );
};

export default Products;
