<script setup lang="ts">
import type { Playlist } from '@/types'
import { computed, defineProps, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

interface Props {
  playlist: Playlist
}
const props = defineProps<Props>()
const playlist = computed(() => {
  return props.playlist
})
onMounted(() => {})
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ playlist.id }}</h5>
      <h6 class="card-subtitle mb-2 text-body-secondary">{{ playlist.title }}</h6>
      <p class="card-text">{{ playlist.description }}</p>
      <RouterLink :to="{name: 'playlist', params: {id: playlist.id}}" class="card-link">Go to playlist</RouterLink>
    </div>
  </div>
</template>
