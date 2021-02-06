import AV, {User} from 'leancloud-storage';

AV.init({
    appId: "knIqwCycMwbrF864OqLPEqK6-gzGzoHsz",
    appKey: "EeTKEMMxFPmGnQasncaySol5",
    serverURL: "https://kniqwcyc.lc-cn-n1-shared.com"
});

const Auth = {
    register(username, password) {
        let user = new User();
        user.setUsername(username);
        user.setPassword(password);
        return new Promise((resolve, reject) => {
            user.signUp().then(loginedUser => resolve(loginedUser), error => reject(error))
        });
    },

    login(username, password) {
        console.log('------')
        console.log(username, password)
        return new Promise((resolve, reject) => {
            User.logIn(username, password).then(loginedUser => resolve(loginedUser), error => reject(error));
        });
    },

    logout() {
        User.logOut();
    },

    getCurrentUser() {
        return User.current();
    }

}


export {
    Auth
};