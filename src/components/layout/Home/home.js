import React, { Fragment,useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./home.css";
import ProductCard from "./PorductCard.js";
import MetaData from "../MetaData.js";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../../actions/productAction";
import Loader from "../Loader/loader";
import {useAlert} from 'react-alert';

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading ,error ,products ,productsCount} = useSelector(  
    (state) =>state.products
  );

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch,error,alert]);
  
  return (
    <Fragment>
      {
        loading ? (<Loader />):
         <Fragment>
        <MetaData title={"Ecomm"} />
        <div className="banner">
          <p>Welcome to ECOMM</p>
          <h1>Find Amazing Product here</h1>
          <a href="#container">
            <button>Scroll {<CgMouse />}</button>
          </a>
        </div>
        <h2 className="homeHeading">Featured products </h2>
        <div className="container" id="container">
          
          {products && products.map((product,i) =>(
            <ProductCard product={product}  key = {i}/>
          ))}
          
        </div>
      </Fragment>
      }
    </Fragment>
   
  );
};

export default Home;
