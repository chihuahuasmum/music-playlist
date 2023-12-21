<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { Playlist } from './types'
import { getPlaylists, addSongToPlaylist } from '@/composables/usePlaylistApi'
import type { Song } from './types/SongTypes'
import { getSongs } from './composables/useSongApi'
import { Dropdown } from 'bootstrap'

const songs = ref<Song[]>([])
const playlists = ref<Playlist[]>([])
const term = ref<string>('')

const fetchPlaylists = () => {
  getPlaylists()
    .then(({ data }) => {
      playlists.value = data
    })
    .catch(({ response }) => {
      playlists.value = []
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
const init = () => {
  fetchPlaylists()
  fetchSongs()

  const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
  [...dropdownElementList].map(
    (dropdownToggleEl) => new Dropdown(dropdownToggleEl)
  )
}

const addSong = (id:number, songId: number) => {
  addSongToPlaylist(id, songId)
    .then(() => {
      alert('Song added')
    })
    .catch(() => {
      alert('Failed. Please try again')
    })
}

const filteredSongs = computed(() => {
  return songs.value.filter((s) => {
    return (
      s.title.toLowerCase().includes(term.value.toLowerCase()) ||
      s.album.toLowerCase().includes(term.value.toLowerCase())
    )
  })
})

onMounted(() => {
  init()
})
</script>
<template>
  <div class="container">
    <h1>Songs</h1>

    <div class="d-block my-2">
      <label for="searchSongsInput" class="form-label">Search</label>
      <input
        type="text"
        v-model="term"
        id="searchSongsInput"
        class="form-control"
        aria-describedby="searchHelpBlock"
      />
      <div class="form-text" id="searchHelpBlock">
        Type a song's name or album you want to search for
      </div>
    </div>

    <table class="table" v-if="songs.length > 0">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Album</th>
          <th scope="col">Year</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(song, index) in filteredSongs" :key="index">
          <tr>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-secondary btn-sm dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Add to playlist
                </button>
                <ul class="dropdown-menu">
                  <template v-for="(playlist, index) in playlists" :key="index">
                    <li>
                      <button @click="()=>{ addSong(playlist.id,song.rank) }" class="dropdown-item" type="button">{{ playlist.title }}</button>
                    </li>
                  </template>
                </ul>
              </div>
            </td>
            <td>{{ song.title }}</td>
            <td>{{ song.album }}</td>
            <td>@{{ song.year }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
