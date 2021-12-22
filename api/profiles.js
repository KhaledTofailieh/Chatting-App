
const profiles_controller = require('../controllers/index')['profiles_controller']
const profile_upload = require('../storage/index')['profile']


module.exports = (router) => {

    router.get('/profiles', (req, res) => {
        res.send({ msg: "this is register bage" })
    })

    router.put('/profiles', profile_upload.single('profile'), async (req, res) => {
        console.log('this is put new profile')
        const status = 200, msg = 'added sucessful'

        //    const user_id = req.session.user_id
        console.log(user_permissions[req.session.role].can_add_profile(2))
        if (user_permissions[req.session.role].can_add_profile(req.session.profiles_count)) {
            try {
                const user_id = 2
                const url = req.file.path
                await profiles_controller.add(url, user_id)
            } catch (e) {
                status = 404
                msg = 'some error occered'
                console.log('catch some exception')
            }
        } else {
            msg = 'forbeddin'
            status = 403
        }
        res.status(status)
        res.send({ message: msg })

    })

    return router
}