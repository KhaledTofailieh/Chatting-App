const perms = {
    can_add_profile: false,
    can_fetch_users: true,
    can_fetch_convs: false,

    users_list_attributes: ['name','main_language','learn_language'],

    users_fetch_clause: (languages) => {
        const clause = {/*there is no clause for browser user yet*/ }
        return clause
    },

    single_user_attributes: {
        other: ['name', 'last_seen','main_language','learn_language']
    },


    users_fetch_limit: 2

}
module.exports = {
    name: 'browser',
    permissions: perms
}