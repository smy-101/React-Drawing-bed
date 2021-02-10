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

const Uploader = {
    add(file, filename) {
        const item = new AV.Object('Image');
        const avFile = new AV.File(filename, file);
        item.set('filename', filename);
        item.set('owner', AV.User.current());
        item.set('url', avFile);
        return new Promise((resolve, reject) => {
            item.save().then(serverFile => resolve(serverFile), error => reject(error));
        });
    },
    find({page = 0, limit = 10}) {
        const query = new AV.Query('Image');
        query.include('owner');
        query.limit(limit);
        query.skip(page * limit);
        query.descending('createdAt');
        query.equalTo('owner', AV.User.current());
        return new Promise((resolve, reject) => {
            query.find().then(results => resolve(results)).catch(error => reject(error))
        })
    },
    delete(objectId){
        const item = AV.Object.createWithoutData('Image', objectId);
        console.log(item);
        return new Promise((resolve, reject) => {
            item.destroy().then(() => {
                console.log('success');}).catch(error => reject(error))
        })
    }
}


export {Auth, Uploader};