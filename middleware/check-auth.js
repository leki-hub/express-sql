const jwt = require( "jsonwebtoken" );

function  verifyToken( req, res, next ) {
    try {
        let token = req.headers.authorization.split( ' ')[1]; // 'Bearer' <token as in re.header
        const decodedToken= jwt.verify( token, "setsecretkeyfrom_env");
        req.userData = decodedToken;
        next();
        
    } catch (err) {
        return res.status(401).json(
            { message: 'Invalid or expired token provided' ,
            error : err
           }
        );
        
    }
    
}

module.exports = {
    checkAuth:verifyToken
}