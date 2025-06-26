import $api from '../http/index'

export default class UserService {
    async fetchUsers() {
        return await $api.get('/users')
    }
}