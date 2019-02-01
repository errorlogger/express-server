module.exports.add = (a, b) => {
    return a + b;
};

module.exports.asyncAdd = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b)
    }, 1000)
};

module.exports.sub = (a, b) => {
    return a - b;
}

module.exports.square = (a) => {
    return a * a;
}

module.exports.asyncSquare = (a, callback) => {
    var res = a * a;
    setTimeout(() => {

        callback(res);
    }, 500)
}

module.exports.setName = (user, fullName) => {
    let name = fullName.split(" ");
    user.firstName = name[0];
    user.lastName = name[1]

    return user;
} 