const { Op } = require('sequelize')
const perms = {
    can_add_profile: (current_count) => {
        return current_count < 4
    },
    can_fetch_users: true,
    can_fetch_convs: true,


    users_list_attributes: ['name', 'phone', 'last_seen','main_language','learn_language'],
    users_fetch_clause: (languages) => {
        const clause = {
            [Op.and]: {
                main_language: {
                    [Op.eq]: languages.learn
                },
                learn_language: {
                    [Op.eq]: languages.main
                }
            }
        }
        return clause
    },
    single_user_attributes: { own: [], other: ['name', 'last_seen'] },

    convs_fetch_limit: 10,
    users_fetch_limit: 4

}
module.exports = {
    name: 'user',
    permissions: perms
}