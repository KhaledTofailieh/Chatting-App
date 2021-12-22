const users_controller = require('../controllers/index')['users_controller']
module.exports = (router) => {

    router.get('/register', (req, res) => {
        console.log(req.session.phone)
        res.send({msg: "this is register bage"})
    })

    router.put('/register', async (req,res)=>{
       console.log('this is put new user')
       
       await users_controller.add(req,res)
       
       res.send("this is adding new user")
    })

    return router
}