import React from 'react'
import styled from 'styled-components';


const Wrapper = styled.footer`
  padding: 10px 100px;
  text-align: center;
  font-size: 12px;
  color: #aaa;
`

function Footer() {
    return (
        <Wrapper>
            <div>Footer</div>
        </Wrapper>
    )
}


export default Footer;