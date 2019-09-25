var jwt = require('jsonwebtoken');
var config = require('../../config');
const Permission = require('../../model/masters/permission.model');

var verifyToken = function (menu) { 
    return function (req, res, next) { 
      console.log(menu) 
      var token = req.headers['x-token']; 
      if (!token) { 
        req.status = 200; 
        const error = new Error("No token provided."); 
        next(error); 
      } 
      else{ 
        jwt.verify(token, config.secret, async (err, decoded) => { 
          if (err) { 
            req.status = 200; 
            const error = new Error("Failed to authenticate token."); 
            next(error); 
          } 
          else { 
        
            const permission = await Permission.find(
                {
                    menuName: menu, teacherId: decoded.id
                },
                {
                    "isView" : 1,"isSave" : 1,"isUpdate" : 1,"isDelete" : 1, "_id": 0
                }) 

                
            if(permission.length < 0){
                permission = [{"isView" : false,"isSave" : false,"isUpdate" : false,"isDelete" : false,}] 
            }

            res.locals = {decoded:decoded, permission: permission[0]}; 
            next(); 
          } 
        });
      }
    }
  }

module.exports = verifyToken;
