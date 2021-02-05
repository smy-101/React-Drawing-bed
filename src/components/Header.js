import React from 'react'
import logo from '../logo.svg';
import {BrowserRouter as Router, Link} from "react-router-dom";

function Header() {
    return (
        <>
            <img src={logo} alt="logo"/>
            <nav>
                <Link to="/">首页</Link>
                <Link to="/history">历史记录</Link>
                <Link to="/about">关于我</Link>
            </nav>
        </>
    )
}


export default Header;