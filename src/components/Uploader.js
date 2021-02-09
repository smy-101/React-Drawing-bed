import React, {useRef} from 'react';
import {useStores} from "../stores";
import {observer, useLocalStore} from "mobx-react";
import {Upload, message, Spin} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;

  > h1 {
    margin: 20px 0;
    text-align: center;
  }

  > dl > dd > img {
    max-width: 300px;
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
                    <dl>
                        <dt>地址</dt>
                        <dd><a target="_blank"
                               href={ImageStore.serverFile.attributes.url.attributes.url}>{ImageStore.serverFile.attributes.url.attributes.url}</a>
                        </dd>
                        <dt>文件名</dt>
                        <dd>{ImageStore.filename}</dd>
                        <dt>图片预览</dt>
                        <dd>
                            <img src={ImageStore.serverFile.attributes.url.attributes.url} alt="图片地址"/>
                        </dd>
                        <dt>图片尺寸修改</dt>
                        <dd>
                            <input ref={ref1} onChange={bindWidthChange} placeholder="最大宽度（可选）"/>
                            <input ref={ref2} onChange={bindHeightChange} placeholder="最大高度（可选）"/>
                        </dd>
                        <dd>
                            <a target="_blank" href={store.fullStr}>{store.fullStr}</a>
                        </dd>
                    </dl>
                </Wrapper> : null
            }
        </div>
    )
})

export default Uploader;