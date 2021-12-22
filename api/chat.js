module.exports = (router) => {

    router.get('/chat', (req, res) => {
        console.log(req.session.phone)
        res.send({ msg: "this is chat bage" })
    })
    return router
}