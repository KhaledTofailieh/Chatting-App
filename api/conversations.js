
const convs_controller = require('../controllers/index')['convs_controller']
const { toInteger } = require('lodash')
const roles = require('../roles/application/index')

module.exports = (router) => {

    router.get('/conversations', async (req, res) => {
        //get my conversations, conversations already I'm In
        let status = 200, msg = '', offset = 0
        if (!req.session.role) {
            req.session.role = 'browser'
        }
        if (req.query.offset) {
            offset = toInteger(req.query.offset)
        }
        try {
            if (roles[req.session.role].can_fetch_convs) {
                const user = {
                    id: req.session.uid,
                    role: req.session.role,
                    offset: offset
                }
                console.log(user)
                msg = await convs_controller.get(user)
            } else {
                status = 403
                msg = 'forbidden'
            }

        } catch (e) {
            status = 404
            msg = 'can\'t reached page'
            console.log('fetch users')
            console.log(e)
        }
        res.status(status)
        res.send(msg)
    })
    router.get('/conversations/groups',async  (req, res) => {
        //get my groups, groups which I'm already joined
        let status = 200, msg = '', offset = 0
        if (!req.session.role) {
            req.session.role = 'browser'
        }
        if (req.query.offset) {
            offset = toInteger(req.query.offset)
        }
        try {
            if (roles[req.session.role].can_fetch_convs) {
                const user = {
                    id: req.session.uid,
                    role: req.session.role,
                    offset: offset
                }
                console.log(user)
                msg = await convs_controller.get(user)
            } else {
                status = 403
                msg = 'forbidden'
            }

        } catch (e) {
            status = 404
            msg = 'can\'t reached page'
            console.log('fetch users')
            console.log(e)
        }
        res.status(status)
        res.send(msg)


    })
    router.get('/conversation/:id', async (req, res) => {
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
            // msg = await convs_controller.get_user(id, role, fetch_type)
        } catch (e) {
            status = 404
            console.log(e)
        }

        res.send(msg)
    })

    router.put('/conversation', async (req, res) => {
        const conv = req.body
        //type and users 
        //users:  is list of user{id:"someid", role: "somerole"}
        // group features is: name, language, type
        try {
            await convs_controller.create(conv)
        } catch (e) {

        }
        res.send('created')
    })
    return router
}