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
    },
    getGroupById(params){
        return api().get('group/'+params)
    },
    addToVoteList(params){
        return api().put('group/update-book-vote', params)
    },
    changeVote(params){
        return api().put('group/change-vote/' + params.id, params)
    },
    startReading(params){
        return api().put('group/start-reading', params)
    },
    currentReadingList(params){
        return api().get('current-reading', params)
    }
}