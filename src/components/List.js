import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useStores} from "../stores";
import InfiniteScroll from 'react-infinite-scroller';
import {Button, List, Spin,message} from 'antd';
import styled from 'styled-components';
import {Uploader} from '../models'
import copy from "copy-to-clipboard";

const ButtonWrapper = styled.div`
  > button {
    margin-right: 4px;
  }
`

const Wrapper = styled.div`
  > img {
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
                hasMore={!HistoryStore.isLoading && HistoryStore.hasMore}
                useWindow={true}
            >
                <List
                    dataSource={HistoryStore.list}
                    renderItem={
                        item => <List.Item key={item.id}>
                            <Wrapper>
                                <img src={item.attributes.url.attributes.url} alt="图片地址"/>
                            </Wrapper>
                            <div>
                                <h5>{item.attributes.filename}</h5>
                            </div>
                            <ButtonWrapper>
                                <Button size="small" type="primary" onClick={() => {
                                    copy(item.attributes.url.attributes.url);message.success('复制成功');
                                }}>复制链接</Button>
                                <Button size="small" type="primary" onClick={() => {
                                    window.open(item.attributes.url.attributes.url)
                                }}>打开链接</Button>
                                <Button size="small" type="primary" onClick={() => {
                                    Uploader.delete(item.id);
                                    setTimeout(()=>{
                                        window.location.reload(true)
                                    },1000)
                                }}>删除图片</Button>
                            </ButtonWrapper>
                        </List.Item>
                    }
                >
                    {HistoryStore.isLoading && HistoryStore.hasMore && (
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