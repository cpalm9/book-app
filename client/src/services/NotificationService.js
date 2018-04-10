import api from '@/services/api'

export default {
  addNotification(params) {
    return api().post('notification', params)
  },

  getNotifications(params) {
    return api().get('notifications', params)
  }
}