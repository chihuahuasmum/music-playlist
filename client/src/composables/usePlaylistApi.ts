import ApiService from '@/services/ApiService'

const getPlaylists = () => {
  return ApiService.get('playlists')
}

const getPlaylist = (id: number) => {
  return ApiService.get(`playlist/${id}`)
}

const addSongToPlaylist = (id: number, songId: number) => {
  return ApiService.put(`playlist/song/${id}/${songId}`, {})
}

const deleteSongFromPlaylist = (id: number, songId: number) => {
  return ApiService.delete(`playlist/song/${id}/${songId}`)
}

const addPlaylist = (params: any) => {
  return ApiService.post('playlist', params)
}

export { getPlaylists, getPlaylist, addSongToPlaylist, deleteSongFromPlaylist, addPlaylist }
