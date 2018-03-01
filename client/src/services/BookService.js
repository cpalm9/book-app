import api from '@/services/api';

export default {
    fetchBooks () {
        return api().get('books')
    },
    addBook (params) {
        return api().post('book', params)
    },
    updateBook(params){
        return api().put('book/' + params.id, params)
    },
    getBook(params) {
        return api().get('book/' + params.id)
    },
    deleteBook(params) {
        return api().delete('book/' + params)
    },
    fetchGoogleBook(params) {
        return api().get('google/books/'+ params)
    }
}