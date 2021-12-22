const images_model = require('../models/index')['image']

const controller = {

    add: async (url, user_id) => {
        try {
            const image = images_model.build({
                url: url,
                userId: user_id
            })
            await image.save()
        } catch (e) {
            throw e
        }
        return true
    },
    delete: (user_id, image_id) => {

    },
    get_one: (user_id) => {

    },
    get: (user_id) => {

    },
    post: (img_id) => {

    }
}
module.exports = {
    name: 'profiles_controller',
    controller: controller
} 