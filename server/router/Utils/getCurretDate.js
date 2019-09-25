var date = function() {
    var d = new Date().toISOString().
    replace(/T/, ' ').      // replace T with a space
    replace(/\..+/, '')  
    return d;
  };

module.exports = date;
