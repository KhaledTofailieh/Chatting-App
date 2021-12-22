
 const login = require('./login')
 const contacts = require('./contacts')

 module.exports = (router) => {

  router.get('/', (req, res) => {
    if (req.session.is_logged) {
      res.redirect('/contacts')
    }
    else {
      res.redirect('/login')
    }
  })
  router.use('/login',login(router))
  router.use('/contacts',contacts(router))
  
  return router
}