import React, { useEffect } from "react";
import {observer} from "mobx-react";
import {useStores} from "../stores";
import InfiniteScroll from 'react-infinite-scroller';
import { List, Spin} from 'antd';
import styled from 'styled-components';
import {Uploader} from '../models'


const Wrapper=styled.div`
  >img{
    width: 100px;
    height: 120px;
    object-fit: contain;
    border: 1px solid #eee;
  }
`


const Lists = observer(() => {
    const {HistoryStore} = useStores();
    const loadMore = () => {
        HistoryStore.find();
    };

    useEffect(() => {
        return () => {
            console.log('重新加载')
            HistoryStore.reset();
        }
    }, []);
    return (
        <div>
            <InfiniteScroll
                initialLoad={true}
                pageStart={0}
                loadMore={loadMore}
                hasMore={!HistoryStore.isLoading&&HistoryStore.hasMore}
                useWindow={true}
            >
                <List
                    dataSource={HistoryStore.list}
                    renderItem={
                        item => <List.Item key={item.id}>
                            <Wrapper>
                                <img src={item.attributes.url.attributes.url}   alt="图片地址"/>
                            </Wrapper>
                            <div>
                                <h5>{item.attributes.filename}</h5>
                            </div>
                            <div>
                                <a  target="_blank" href={item.attributes.url.attributes.url}>{item.attributes.url.attributes.url}</a>
                            </div>
                            <div>
                                <button onClick={()=>{Uploader.delete(item.id).then(window.location.reload(true))}}>删除</button>
                            </div>
                        </List.Item>
                    }
                >
                    { HistoryStore.isLoading && HistoryStore.hasMore && (
                        <div>
                            <Spin tip="加载中"/>
                        </div>
                    )}
                </List>
            </InfiniteScroll>
        </div>
    )
})


export default Lists;