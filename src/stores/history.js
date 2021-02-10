import {observable, action} from 'mobx';
import {Uploader} from '../models';
import {message} from 'antd';

class HistoryStore {
    @observable list = [];
    @observable isLoading = false;
    @observable hasMore = true;
    @observable page = 0;
    limit = 10;

    @action append(newList) {
        this.list = this.list.concat(newList);
    }

    @action find() {
        this.isLoading = true;
        Uploader.find({page: this.page, limit: this.limit})
            .then(newList => {
                this.append(newList);
                this.page++;
                if (newList.length < this.limit) {
                    this.hasMore = false;
                }
            }).catch(error => {
            console.log(error);
            message.error('加载数据失败');
        }).finally(() => {
            this.isLoading = false;
        });
    }

    @action reset() {
        this.list = [];
        this.isLoading = false;
        this.hasMore = true;
        this.page = 0;
    }

    @action delete(){
        console.log(this.list);
        this.isUpoading = true;
        return new Promise((resolve, reject)=>{
            Uploader.delete(this.serverFile.id)
                .then(()=>{console.log('success');}).catch(err => {
                message.error('删除失败');
                reject(err);
            }).finally(() => {
                this.isUpoading = false;
            });
        })
    }


}


export default new HistoryStore();
