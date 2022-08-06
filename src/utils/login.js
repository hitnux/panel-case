import userData from '../data/users.json'

const findUser = (options) => {
    const user = Object.assign({}, userData.users.find((u) => {
        if ((options.username && options.password && options.username === u.username && options.password === u.password) ||
            (options.accessKey && options.accessKey === u.accessKey)) {
            return true;
        }
        return false;
    }));
    delete user.password;
    return user
}

const getUser = () => {
    const accessKey = localStorage.getItem('accces_key');
    if (accessKey) return findUser({ accessKey }) || false;
    return false;
}

const userLogin = (username, password) => {
    const user = findUser({ username, password });
    if (user) {
        localStorage.setItem('accces_key', user.accessKey);
        return user
    }
    return 'error'
}

export { userLogin, getUser }