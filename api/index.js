
const login = require('./login')
const contacts = require('./users')
const register = require('./register')
const profiles = require('./profiles')
const convs = require('./conversations')

module.exports = (router) => {

  router.get('/', (req, res) => {
    if (req.session.is_logged) {
      res.redirect('/api/contacts')
    }
    else {
      res.redirect('/api/login')
    }
  })
  
  router.use('/api/login', login(router))
  router.use('/api/contacts', contacts(router))
  router.use('/api/register', register(router))
  router.use('/api/profiles', profiles(router))
  router.use('/api/conversations',convs(router))
  return router
}