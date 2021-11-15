
import {
    User
} from '../models';

import {
    verify
} from 'jsonwebtoken';


// import {AuthenticationError} from 'apollo-server-express'

/**
 * Custom User Authentication Middleware
 * Which Finds the user from the database using the request token 
 */
const AuthMiddleware = async (req, res, next) => {
    // Extract Authorization Header
    const authHeader = req.get("Authorization");
   
// console.log(authHeader,"ddddd")
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    
    // Extract the token and check for token
    // console.log(authHeader)
    const token = authHeader.split(" ")[1];
    if (!token || token === "") {
        req.isAuth = false;
        return next();
    }
    // Verify the extracted token
    let decodedToken;
    try {
        // console.log(token)
        decodedToken = verify(token, process.env.SECRET_ACCESS_KEY);
   
    } catch (err) {
        req.isAuth = false;
        return next()
    }
    // If decoded token is null then set authentication of the request false
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }
    // If the user has valid token then Find the user by decoded token's id
    // console.log(decodedToken.id)
    let authUser = await User.findById(decodedToken.id);
  
    if (!authUser) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.user = authUser;
    req.role = authUser.roles
    return next();
}


export default AuthMiddleware;