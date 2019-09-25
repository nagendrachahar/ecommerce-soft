var toLocalTime = function(time, HH) {
    var d = new Date(time);
    var offset = ((new Date().getTimezoneOffset()) * -1)/60;
    var n = new Date(d.setHours(HH+offset));
    return n;
  };

module.exports = toLocalTime;
