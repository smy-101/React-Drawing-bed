import React, {useRef} from 'react';
import {useStores} from "../stores";
import {observer, useLocalStore} from "mobx-react";
import {Upload, message, Spin, Popover, Button} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';

const Wrapper = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;

  > p {
    margin: 0 0 4px 0;

  }

  > h1 {
    margin: 20px 0;
    text-align: center;
  }

  > div > input {
    margin-right: 4px;
  }

  > img {
    max-width: 300px;
    margin-bottom: 4px;
  }

  > .name {
    margin-bottom: 4px;
  }

  > .button {
    margin-top: 4px;
    display: flex;
    justify-content: center;
  }
`
const ContentWrapper = styled.div`
  > button {
    margin-right: 4px;
  }
`


const {Dragger} = Upload;
const Uploader = observer(() => {
    const {ImageStore, UserStore} = useStores();
    const ref1 = useRef();
    const ref2 = useRef();
    const props = {
        showUploadList: false,
        beforeUpload: file => {
            ImageStore.setFile(file);
            ImageStore.setFilename(file.name);
            if (UserStore.currentUser === null) {
                message.warning('请先登录再上传！');
                return false;
            }
            if (!/(svg$)|(png$)|(jpg$)|(jpeg$)|(gif$)/ig.test(file.type)) {
                message.error('只能上传png/svg/jpg/gif格式的图片');
                return false;
            }
            if (file.size > 1024 * 1024) {
                message.error('图片最大1M');
                return false;
            }
            ImageStore.upload()
                .then((serverFile) => {
                    console.log('上传成功')
                    console.log(serverFile);
                    console.log(serverFile.attributes.url.attributes.url);
                }).catch(() => {
                console.log('上传失败')
            });
            return false;
        }
    }


    const bindWidthChange = () => {
        store.setWidth(ref1.current.value);
    };

    const bindHeightChange = () => {
        store.setHeight(ref2.current.value);
    };

    const store = useLocalStore(() => ({
        width: null,
        setWidth(width) {
            store.width = width;
        },
        get widthStr() {
            return store.width ? `/w/${store.width}` : '';
        },
        height: null,
        setHeight(height) {
            store.height = height;
        },
        get heightStr() {
            return store.height ? `/h/${store.height}` : '';
        },
        get fullStr() {
            //?imageView2/0/w/800/h/400)
            return ImageStore.serverFile.attributes.url.attributes.url + '?imageView2/0' + store.widthStr + store.heightStr
        }
    }));
    const handleOpen = () => {
        window.open(store.fullStr);
        // window.location.href="https://www.baidu.com/";
    }
    const handleCopy = () => {
        copy(store.fullStr);
    }


    const content = (
        <ContentWrapper>
            <Button type="primary" size="small" onClick={handleCopy}>复制链接</Button>
            <Button type="primary" size="small" onClick={handleOpen}>打开链接</Button>
        </ContentWrapper>
    );


    return (
        <div>
            <Spin tip="上传中" spinning={ImageStore.isUpoading}>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">点击或者拖拽上传图片</p>
                    <p className="ant-upload-hint">仅支持一般常见类型的图片，图片最大1M</p>
                </Dragger>
            </Spin>
            {
                ImageStore.serverFile ? <Wrapper>
                    <h1>上传结果</h1>
                    <p>图片预览</p>
                    <img src={ImageStore.serverFile.attributes.url.attributes.url} alt="图片地址"/>
                    <p>文件名</p>
                    <div className="name">{ImageStore.filename}</div>
                    <p>图片尺寸修改(不等比例修改可能导致图片失真)</p>
                    <div>
                        <input ref={ref1} onChange={bindWidthChange} placeholder="最大宽度(可选)"/>
                        <input ref={ref2} onChange={bindHeightChange} placeholder="最大高度(可选)"/>
                    </div>
                    <div className="button">
                        <Popover content={content} title="请选择操作" trigger="click">
                            <Button type="primary">生成链接</Button>
                        </Popover>
                    </div>
                </Wrapper> : null
            }
        </div>
    )
})

export default Uploader;