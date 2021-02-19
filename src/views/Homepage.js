import React from 'react'
import {observer} from 'mobx-react';
// import {useStores} from '../stores';
import Uploader from "../components/Uploader";
import Tips from "../components/Tips";


const Homepage = observer(() => {
    // const {UserStore} = useStores();
    return (
        <>
            <div>
                <Tips>请先登录再上传</Tips>
                <Uploader/>
            </div>
        </>
    );
})


export default Homepage;