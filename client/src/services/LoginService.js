import api from '@/services/api';

export default {
    login(params){
        return api().post('/login', params)
    },
    register(params){
        return api().post('/register', params)
    }
}