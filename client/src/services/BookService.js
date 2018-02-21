import api from '@/services/api';

export default {
    fetchBooks () {
        return api().get('books')
    },
    addBook (params) {
        return api().post('book', params)
    }
}