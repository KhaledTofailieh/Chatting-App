
const users_controller = require('../controllers/index')['users_controller']
const { toInteger } = require('lodash')
const roles = require('../roles/application/index')

module.exports = (router) => {

    router.get('/users', async (req, res) => {
        let status = 200, msg = ''
        if (!req.session.role) {
            req.session.role = 'browser'
        }
        try {
            if (roles[req.session.role].can_fetch_users) {
                msg = await users_controller.get(req)
            } else {
                status = 403
                msg = 'forbidden'
            }

        } catch (e) {
            status = 404
            console.log('fetch users')
            console.log(e)
        }
        res.status(status)
        res.send(msg)
    })

    router.get('/users/:id', async (req, res) => {
        let status = 200, msg = ''
        let role = req.session.role, fetch_type = 'other'
        try {
            const id = toInteger(req.params.id)
            if (!req.session.role) {
                role = 'browser'
            }
            if (req.session.id == req.params.id) {
                fetch_type = 'own'
            }
            msg = await users_controller.get_user(id, role, fetch_type)
        } catch (e) {
            status = 404
            console.log(e)
        }

        res.send(msg)
    })

    return router
}