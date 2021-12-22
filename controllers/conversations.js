const userconversation_model = require('../models/index')['user_conversation']
const conversation_model = require('../models/index')['conversation']
const group_model = require('../models/index')['group']
const single_model = require('../models/index')['single']
const roles = require('../roles/application/index')
const conv_roles = require('../roles/conversation/index')
const { Sequelize } = require('sequelize')
const controller = {

    create: async (conv) => {
        try {
            let conversation = await conversation_model.create({
                type: conv.type,
                name: ''
            })
            if (conv.type === 'single') {

            } else if (conv.type === 'group') {
                let group = await group_model.create({
                    name: conv.group.name,
                    type: conv.group.type,
                    language: conv.group.language
                });
                await group.save()
                conversation.setGroup(group)

            } else {
                return false
            }
            //add users to coversation
            for (var user of conv.users) {
                await userconversation_model.create({
                    user_role: user.role,
                    userId: user.id,
                    conversationId: conversation.id
                })
            }

        } catch (e) {
            throw e
        }
        return true
    },
    delete: (user_id, image_id) => {

    },
    get_one: (user_id) => {

    },
    get: async (user) => {
        try {
            console.log(conv_roles['member'])
            var { rows, count } = await userconversation_model.findAndCountAll({
                attributes: ['id', 'role'],
                where: {
                    userId: user.id
                },
                include: {
                    model: conversation_model,
                    include: [
                        { model: userconversation_model, attributes:['id','']},
                        { model: group_model, attributes: ['id', 'name', 'link', 'language'] },
                        { model: single_model }],

                    attributes: ['id', 'status', 'type']
                },
                offset: user.offset,
                limit: roles[user.role].convs_fetch_limit,

            })
        } catch (e) {
            throw e
        }

        return rows
    },
    get_groups: (user) => {

    },
    post: (img_id) => {

    }
}
module.exports = {
    name: 'convs_controller',
    controller: controller
} 