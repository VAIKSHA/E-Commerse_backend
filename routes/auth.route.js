// POST localhost:8888/ecomm/api/v1/auth/signup

// I need to intercept this
const authController = require("../controllers/auth.controller")
const authMW = require("../Middlewares/auth.mw")

module.exports = (app)=>{
    // route for POST localhost:8888/ecomm/api/v1/auth/signup
    app.post("/ecomm/api/v1/auth/signup",[authMW.verifySignUpBody], authController.signup)
                                                // MiddleWare
    // route for POST localhost:8888/ecomm/api/v1/signin
    app.post("/ecomm/api/v1/auth/signin",[authMW.verifySignInBody], authController.signin)
                                                // MiddleWare
}                                             
