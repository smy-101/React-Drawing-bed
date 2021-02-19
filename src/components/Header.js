import React, {useEffect} from 'react'
import logo from '../logo.svg';
import {NavLink, useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {Button} from 'antd';
import {useStores} from '../stores';
import {observer} from 'mobx-react';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 100px;
  background-color: #02101f;
  color: #fff;

  img {
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
`;
const Login = styled.div`
  margin-left: auto;

  > button {
    margin-left: 10px;
  }
`;
const StyledButton = styled(Button)`
  margin-left: 10px;
`;

const Header = observer(() => {
    const history = useHistory();
    const {UserStore, AuthStore} = useStores();

    const handleLogout = () => {
        AuthStore.logout();
    };

    const handleLogin = () => {
        console.log('跳转到登录页面')
        history.push('/login');
    };

    const handleRegister = () => {
        console.log('跳转到注册页面')
        history.push('/register');
    };

    useEffect(() => {
        UserStore.pullUser();
    }, [])

    return (
        <Wrapper>
            <img src={logo} alt="logo"/>
            <nav>
                <NavLink to="/" exact activeClassName="active">首页</NavLink>
                <NavLink to="/history" activeClassName="active">历史记录</NavLink>
                <NavLink to="/about" activeClassName="active">关于</NavLink>
            </nav>
            <Login>
                {
                    UserStore.currentUser ? <>
                        {UserStore.currentUser.attributes.username} <StyledButton type="primary"
                                                                                  onClick={handleLogout}>注销</StyledButton>
                    </> : <>
                        <StyledButton type="primary" onClick={handleLogin}>登录</StyledButton>
                        <StyledButton type="primary" onClick={handleRegister}>注册</StyledButton>
                    </>

                }
            </Login>
        </Wrapper>
    )
})


export default Header;