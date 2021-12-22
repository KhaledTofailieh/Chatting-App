const perms = {
    can_add_profile: (current_count) => {
        return current_count < 4
    },
    can_fetch_users: true,
    can_fetch_convs: true,

    users_list_attributes: ['name', 'phone', 'last_seen','main_language','learn_language'],

    users_fetch_clause: (languages) => {
        const clause = {/*there is no clause for browser user yet*/ }
        return clause
    },

    single_user_attributes: {
        own: [],
        other: []
    },

    convs_fetch_limit: 50,
    users_fetch_limit: 20

}
module.exports = {
    name: 'admin',
    permissions: perms
}