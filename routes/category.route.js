// POST -> localhost:8888/ecomm/api/v1/categories

const authMw = require("../Middlewares/auth.mw")

category_controller = require("../controllers/category.controller")
auth_mw = require("../Middlewares/auth.mw")

module.exports = (app)=>{
    app.post("/ecomm/api/v1/categories", [authMw.verifyToken, authMw.isAdmin], category_controller.createNewCategory)
}