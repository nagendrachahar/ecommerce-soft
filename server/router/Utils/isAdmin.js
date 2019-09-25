const isAdmin = (res) => {
    let Admin = (res.locals.decoded.userType === 'Admin' 
                && res.locals.decoded.userCode === 'Admin'); 

    return Admin
}

module.exports = isAdmin;
