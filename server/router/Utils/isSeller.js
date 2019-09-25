const isSeller = (res) => {
    let Seller = (res.locals.decoded.userType === 'Seller'); 

    return Seller
}

module.exports = isSeller;
