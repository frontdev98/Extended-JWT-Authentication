import $api from '../http/index'

export default class UserService {
    static async fetchUsers() {
        return await $api.get('/users')
    }
}