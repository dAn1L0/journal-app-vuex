import axios from 'axios'


const journalApi = axios.create({
  baseURL: 'https://vuex-journal-1a3a5-default-rtdb.firebaseio.com'
})

export default journalApi