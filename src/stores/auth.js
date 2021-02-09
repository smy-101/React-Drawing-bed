import {observable, action} from 'mobx';
import {Auth} from '../models';
import UserStore from './user';
import HistoryStore from './history';
import ImageStore from './image';
import {message} from "antd";

class AuthStore {
    @observable values = {
        username: '',
        password: ''
    };

    @action setUsername(username) {
        this.values.username = username;
    }

    @action setPassword(password) {
        this.values.password = password;
    }

    @action login() {
        return new Promise((resolve, reject) => {
            Auth.login(this.values.username, this.values.password)
                .then(user => {
                    message.success('登录成功');
                    UserStore.pullUser();
                    resolve(user);
                }).catch(err => {
                message.error('登录失败');
                UserStore.resetUser();
                reject(err);
            })
        });
    }

    @action register() {
        return new Promise((resolve, reject) => {
            Auth.register(this.values.username, this.values.password)
                .then(user => {
                    message.success('注册成功');
                    UserStore.pullUser();
                    resolve(user);
                }).catch(err => {
                message.error('注册失败');
                UserStore.resetUser();
                reject(err);
            })
        });
    }

    @action logout() {
        Auth.logout();
        HistoryStore.reset();
        ImageStore.reset();
        UserStore.resetUser();
    }

}


export default new AuthStore();
