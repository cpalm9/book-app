import api from '@/services/api';

export default {
    fetchBooks () {
        return api().get('books')
    }
}