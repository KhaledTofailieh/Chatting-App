
const users_cache = require('../caches/index')['users']
const sockets_cache = require('../caches/index')['sockets']
const users_model = require('../models/index')['user']
const profiles_model = require('../models/index')['profile']
const roles = require('../roles/application/index')

const { toInteger } = require('lodash')
const { query } = require('express')

const controller = {
    login: async (req) => {
        try {
            const user = await users_model.findOne({
                attributes: ['role', 'name', 'id', 'main_language', 'learn_language'],
                where: {
                    phone: req.query.phone
                }
            })
            /**
            * some process for authentication 
            */
            if (user != null) {

                req.session.is_logged = true
                req.session.phone = req.query.phone
                req.session.role = user.role
                req.session.uid = user.id
                req.session.main = user.main_language
                req.session.learn = user.learn_language

                console.log(req.session)
                users_cache[req.session.phone] = {}
                sockets_cache[req.session.phone] = {}

                await users_model.update({ is_logged: true }, {
                    where: {
                        phone: req.session.phone
                    }
                });

            } else {

            }

        } catch (e) {
            console.log('in login')
            console.log(e)
            throw e
        }
        return
    },

    add: async (req, res) => {
        const new_user = users_model.build(req.body)
        await new_user.save()
        return new_user
    },

    delete: (req, res) => {

    },

    logout: async (req, res) => {
        await users_model.update({ is_logged: false, last_seen: new Date() }, {
            where: {
                phone: req.session.phone
            }
        });

        users_cache[req.session.phone] = null
        req.session = null
    },

    get: async (req) => {
        let off = 0
        if (req.query.offset) {
            off = toInteger(req.query.offset)
        }
        const { rows, count } = await users_model.findAndCountAll({
            attributes: roles[req.session.role].users_list_attributes,
            include: {
                model: profiles_model,
                as: 'profiles',
                attributes: ['url', 'createdAt']
            },
            where: roles[req.session.role].users_fetch_clause({ main: req.session.main, learn: req.session.learn }),
            offset: off,
            limit: roles[req.session.role].users_fetch_limit,
        })
        return rows
    },

    get_user: async (id, role, fetch_type) => {
        try {
            console.log(roles)
            console.log(roles[role].single_user_attributes[fetch_type])
            var user = await users_model.findOne({
                attributes: roles[role].single_user_attributes[fetch_type],
                where: { id: id },
                include: {
                    model: profiles_model,
                    as: 'profiles',
                    attributes: ['url', 'createdAt']
                },
            });
        } catch (e) {
            console.log('catched in users controller!')
            console.log(e)
            throw e
        }
        return user
    },

    close: async (phone) => {
        await users_model.update({ last_seen: new Date() }, {
            where: {
                phone: phone
            }
        });
    },


}
module.exports = {
    name: 'users_controller',
    controller: controller
}