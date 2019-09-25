const user = {

    isView : (res) => {
        let isUser = (res.locals.decoded.userType === 'adminUser' 
                && res.locals.permission.isView === true);

        return isUser
    },

    isSave : (res) => {
        let isUser = (res.locals.decoded.userType === 'adminUser' 
                && res.locals.permission.isSave === true);

        return isUser
    },

    isUpdate : (res) => {
        let isUser = (res.locals.decoded.userType === 'adminUser' 
                && res.locals.permission.isUpdate === true);

        return isUser
    },

    isDelete : (res) => {
        let isUser = (res.locals.decoded.userType === 'adminUser' 
                && res.locals.permission.isDelete === true);

        return isUser
    }
    
}

module.exports = user;
