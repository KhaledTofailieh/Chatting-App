const profiles_model = require('../models/index')['profile']

const controller = {
    add: async (url, user_id) => {
        try {
            const profile = profiles_model.build({
                url: url,
                userId: user_id
            })
            await profile.save()
        } catch (e) {
            throw e
        }
        return true
    },
    delete: async (user_id, image_id) => {

    },
    get_one: async (user_id) => {
        const profile = await profiles_model.findOne({
            where: { userId: user_id }
        });
        return profile
    },
    get: async (user_id) => {
        const { rows, count } = await profiles_model.findAndCountAll({
            where: {
                userId: user_id
            },
            attributes: ['id', 'url'],
            limit: 4,
        })
        return rows
    },
    post: (img_id) => {

    }
}
module.exports = {
    name: 'profiles_controller',
    controller: controller
} 