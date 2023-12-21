import ApiService from '@/services/ApiService'

const getSongs = () => {
  return ApiService.get('songs')
}


export { getSongs }
