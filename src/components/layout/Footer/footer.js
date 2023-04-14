import React from "react";
import appStore from "../../../images/Appstore.png";
import playStore from "../../../images/playstore.png";
import {FaInstagramSquare,FaGithub,FaLinkedinIn} from "react-icons/fa";
import "./footer.css";
const footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4> Download Our App</h4>
        <p>Download our App for Android and IOS Mobile .</p>
        <img src={appStore} alt="appStore" />
        <img src={playStore} alt="playStore" />
      </div>
      <div className="midFooter">
        <h1>Ecomm </h1>
        <p>High quality is our first priority .</p>
        <p>Copyright 2022 &copy; Dakshay Bishnoi</p>
      </div>
      <div className="rightFooter">
        <h4>Follow ME </h4>
        <a href="https://www.instagram.com/dakshay505/" target={'_blank'} rel="noreferrer"><FaInstagramSquare/>Instagram</a>
        <a href="https://github.com/Dakshay505" target={'_blank'} rel="noreferrer"><FaGithub/>Github</a>
        <a href="https://www.linkedin.com/in/dakshay-bishnoi-891868206/" target={'_blank'} rel="noreferrer"><FaLinkedinIn/>LinkedIn</a>
      </div>
    </footer>
  );
};

export default footer;
