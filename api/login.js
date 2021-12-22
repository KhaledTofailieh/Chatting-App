const users_controller = require('../controllers/index')['users_controller']

module.exports = (router) => {

    router.get('/login', (req, res) => {
        console.log(req.session.phone)
        res.send({ msg: "this is login bage" })
    })

    router.post('/login',async (req, res) => {
        var status = 200, msg = 'logged in'
        try {
            console.log(req.query)
            console.log(req.params)
            console.log(req.body)
            console.log(req.session)
            if (!req.session.is_logged && req.query.phone) {
               await  users_controller.login(req, res)
                /**
                 * some authentication process
                 */

                res.redirect('/api/conversations')
                return
            } else {
                status = 403
                msg = 'forbidden'
            }
        } catch (e) {
            console.log(e)
            status = 404
            msg = 'error'
        }

        res.status(status)
        res.send({ message: msg })
    })

    return router
}