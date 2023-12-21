<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Playlist } from './types'
import { getPlaylist, deleteSongFromPlaylist } from '@/composables/usePlaylistApi'
import type { Song } from './types/SongTypes'
import { getSongs } from './composables/useSongApi'
const route = useRoute()
const playlistId = computed(() => {
  return parseInt(route.params.id as string)
})
const playlist = ref<null | Playlist>(null)
const songs = ref<Song[]>([])
const fetchPlaylist = () => {
  getPlaylist(playlistId.value)
    .then(({ data }) => {
      playlist.value = data
    })
    .catch(({ response }) => {
      playlist.value = null
      console.error(response.data.errors)
    })
}
const fetchSongs = () => {
  getSongs()
    .then(({ data }) => {
      songs.value = data.songs
    })
    .catch(({ response }) => {
      songs.value = []
      console.error(response.data.errors)
    })
}
const removeSong = (songId: number) => {
  deleteSongFromPlaylist(playlistId.value, songId)
    .then(() => {
      alert('Song has been removed!')
      fetchPlaylist()
    })
    .catch(() => {
      alert('Failed. Please try again')
    })
}

const filteredSongs = computed(() => {
  return songs.value.filter((s) => {
    return playlist.value?.songs.includes(s.rank)
  })
})

const init = () => {
  fetchSongs()
  fetchPlaylist()
}

onMounted(() => {
  init()
})
</script>
<template>
  <template v-if="playlist">
    <div class="playlist-view">
      <h1 class="mb-3">Playlist: {{ playlist.title }}</h1>

      <div class="row" v-if="filteredSongs.length <= 0">
        <h4>Sorry you have no songs</h4>
      </div>

      <div v-if="filteredSongs.length > 0">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Album</th>
              <th scope="col">Year</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(song, index) in filteredSongs" :key="index">
              <tr>
                <td>{{ song.title }}</td>
                <td>{{ song.album }}</td>
                <td>@{{ song.year }}</td>
                <td><button type="button" @click="()=>{removeSong(song.rank)}" class="btn btn-outline-danger btn-sm">Remove</button></td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </template>
</template>
