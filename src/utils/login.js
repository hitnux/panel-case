import userData from '../data/users.json'

const secure = (list) => {
    return list.map((user) => {
        const u = Object.assign({}, user);
        delete u.password;
        delete u.accessKey;
        return u;
    });
}

const findUser = (options) => {
    const user = Object.assign({}, userData.users.find((u) => {
        if ((options.username && options.password && options.username === u.username && options.password === u.password) ||
            (options.accessKey && options.accessKey === u.accessKey))
            return true;
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

export { getUser, findUser, secure }