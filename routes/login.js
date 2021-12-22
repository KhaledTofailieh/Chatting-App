
const path = require('path')
const { users_controller } = require('../controllers/index')
module.exports = (router)=>{

 router.get('/login',(req,res)=>{
  res.sendFile(path.join(__dirname.slice(0,__dirname.length - 7) , 'views/login.html'));
  })

 router.post('/login',(req,res)=>{
  if(req.body.phone && !req.session.is_logged){
    users_controller.login(req,res)
    res.redirect('/contacts')
  }else{
    res.sendFile(path.join(__dirname.slice(0,__dirname.length - 7) , 'views/login.html'))
  }
 })

 return router
}