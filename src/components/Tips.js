import React from 'react';
import {useStores} from '../stores';
import {observer} from 'mobx-react';
import styled from 'styled-components';


const Wrapper = styled.div`
  background: orange;
  padding: 10px;
  margin: 30px 0;
  color: #fff;
  border-radius: 4px;
`

const Tips = observer(({children}) => {
    const {UserStore} = useStores();
    return (
        <Wrapper>
            {
                UserStore.currentUser ?
                    <div>Hello,{UserStore.currentUser.attributes.username}</div> : <div>{children}</div>
            }
        </Wrapper>
    );
})


export default Tips;