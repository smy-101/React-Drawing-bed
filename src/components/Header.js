import React from 'react'
import logo from '../logo.svg';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper=styled.div`
  display: flex;
  align-items: center;
  padding: 10px 100px;
  background-color: #02101f;
  color: #fff;
  img{
    height: 30px;
  }
  > nav {
    > a {
      color: white;
      margin-left: 30px;

      &.active {
        border-bottom: 1px white solid;
      }
    }
  }
`

function Header() {
    return (
        <Wrapper>
            <img src={logo} alt="logo"/>
            <nav>
                <NavLink to="/" exact activeClassName="active">首页</NavLink>
                <NavLink to="/history" activeClassName="active">历史记录</NavLink>
                <NavLink to="/about" activeClassName="active">关于我</NavLink>
            </nav>
        </Wrapper>
    )
}


export default Header;