import api from '@/services/api';

export default {
    addGroup(params){
        return api().post('group', params)
    },
    getGroups(params){
        return api().get('groups', params)
    },
    addMember(params){
        return api().put('group/add/'+params.id, params)
    }
}