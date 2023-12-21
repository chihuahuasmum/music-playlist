<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type Playlist } from '@/types'
import PlaylistItem from './PlaylistItem.vue'
import AddNewPlaylist from './AddNewPlaylist.vue'
import { getPlaylists } from '@/composables/usePlaylistApi'

const playlists = ref<Playlist[]>([])
onMounted(() => {
  fetchPlaylist()
})

const fetchPlaylist = () => {
  getPlaylists()
    .then(({ data }) => {
      playlists.value = data
    })
    .catch(({ response }) => {
      playlists.value = []
      console.error(response.data.errors)
    })
}
</script>

<template>
  <div class="container">
    <h1>Your Playlist</h1>
    <AddNewPlaylist :fetch-playlist="fetchPlaylist" />
    <div class="row">
      <template v-for="(playlist, index) in playlists" :key="index">
        <div class="col-6 mb-3">
          <PlaylistItem :playlist="playlist" />
        </div>
      </template>
    </div>
  </div>
</template>
