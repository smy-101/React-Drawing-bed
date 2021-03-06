import {observable, action} from 'mobx';
import {Uploader} from '../models';
import {message} from "antd";

class ImageStore {
    @observable filename = "";
    @observable file = null;
    @observable isUpoading = false;
    @observable serverFile = null;

    @action setFilename(newFilename) {
        this.filename = newFilename;
    }

    @action setFile(newFile) {
        this.file = newFile;
    }

    @action upload() {
        this.isUpoading = true;
        this.serverFile = null;
        return new Promise((resolve, reject) => {
            Uploader.add(this.file, this.filename)
                .then(serverFile => {
                    message.success('上传成功');
                    this.serverFile = serverFile;
                    resolve(serverFile);
                }).catch(err => {
                message.error('上传失败');
                reject(err);
            }).finally(() => {
                this.isUpoading = false;
            });
        })

    }

    @action reset() {
        this.isUpoading = false;
        this.serverFile = null;
    }
    @action delete(){
        console.log(this.serverFile);
    }



}


export default new ImageStore();
