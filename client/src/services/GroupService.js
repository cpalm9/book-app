import api from '@/services/api';

export default {
    addGroup(params){
        return api().post('group', params)
    }
}