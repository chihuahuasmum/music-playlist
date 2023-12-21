<script setup lang="ts">
import { ref, computed } from 'vue'
import { addPlaylist } from '@/composables/usePlaylistApi'
const showForm = ref<boolean>(false)
const buttonTitle = computed(() => {
  return showForm.value ? 'Cancel' : 'Add new'
})
const isDisabled = computed(() => {
  return formData.value.title === '' || formData.value.description === ''
})
const formData = ref({
  title: '',
  description: ''
})
const submitPlaylist = () => {
  addPlaylist(formData.value)
    .then(() => {
      // Retreive all new playlist
      props.fetchPlaylist()
      formData.value = Object.assign(
        {},
        {
          title: '',
          description: ''
        }
      )
      showForm.value = false
    })
    .catch(() => {
      alert('Failed. Please try again')
    })
}
const props = defineProps<{
  fetchPlaylist: Function
}>()
</script>
<template>
  <div>
    <div class="row mt-3" v-if="showForm">
      <div class="col-12">
        <div class="mb-3">
          <label for="playlistTitle" class="form-label">Title</label>
          <input
            type="text"
            v-model="formData.title"
            class="form-control"
            id="playlistTitle"
            placeholder="Now That's What I Call Music!"
          />
        </div>
        <div class="mb-3">
          <label for="playlistDescription" class="form-label">Description</label>
          <textarea
            class="form-control"
            id="playlistDescription"
            placeholder="Lorem Ipsum"
            rows="3"
            v-model="formData.description"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="d-block mb-5">
      <button
        type="button"
        @click="submitPlaylist"
        :disabled="isDisabled"
        class="btn btn-primary me-3"
        v-if="showForm"
      >
        Submit
      </button>
      <button type="button" @click="showForm = !showForm" class="btn btn-primary">
        {{ buttonTitle }}
      </button>
    </div>
  </div>
</template>
