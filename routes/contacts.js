
const recivers = ["0937759046","0967478585"]
var reciver_index = 0
module.exports = (router) => {

    router.get('/contacts', (req, res) => {
        console.log(req.session.phone)
        res.render('../views/index.ejs', { token: req.session.phone , reciver :recivers[reciver_index++] })
    })
    return router
}