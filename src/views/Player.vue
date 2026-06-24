<template>
  <div class="min-h-screen bg-[#0d1117] pt-16 md:pt-20 pb-10 px-2 md:px-10 lg:px-16 xl:px-24">
    <div class="w-full max-w-[1920px] mx-auto">
      
      <!-- Back Button -->
      <button @click="$router.push('/')" class="text-gray-400 hover:text-white mb-6 flex items-center transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Galeri
      </button>

      <div v-if="loading" class="text-center py-20">
        <svg class="animate-spin h-10 w-10 text-indigo-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-400">Memuat Video...</p>
      </div>

      <div v-else-if="error" class="text-center py-20 text-red-500">
        {{ error }}
      </div>

      <div v-else>
        <!-- Ad Placeholder Top -->
        <div class="w-full min-h-[90px] bg-gray-900 border border-dashed border-gray-700 rounded-lg flex items-center justify-center text-gray-500 mb-6">
          [IKLAN BANNER ATAS] Taruh kode iklan di sini
        </div>

        <!-- Video Player Wrapper -->
        <div class="relative w-full pt-[56.25%] bg-black rounded-lg md:rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-gray-800 mb-6">
          <iframe 
            :src="`https://iframe.mediadelivery.net/embed/681218/${video.bunny_id}?autoplay=true`" 
            loading="lazy" 
            style="border:0;position:absolute;top:0;height:100%;width:100%;" 
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;" 
            allowfullscreen="true">
          </iframe>
        </div>

        <!-- Video Details -->
        <div class="bg-[#151c2a] rounded-2xl p-8 border border-gray-800 mb-6 shadow-xl">
          <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">{{ video.title }}</h1>
          <div class="flex flex-wrap items-center text-base md:text-lg text-gray-400 gap-6">
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {{ (video.views || 0).toLocaleString() }} x ditonton
            </span>
            <span class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formatDate(video.created_at) }}
            </span>
          </div>
        </div>

        <!-- Ad Placeholder Bottom -->
        <div class="w-full min-h-[90px] bg-gray-900 border border-dashed border-gray-700 rounded-lg flex items-center justify-center text-gray-500">
          [IKLAN BANNER BAWAH] Taruh kode iklan di sini
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const video = ref(null)
const loading = ref(true)
const error = ref('')

const api = axios.create({
  baseURL: 'https://api.getfiles.my.id',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

const fetchVideo = async () => {
  try {
    const slug = route.params.slug
    const res = await api.get(`/video/${slug}`)
    if (res.data.success) {
      video.value = res.data.video
    } else {
      error.value = 'Video tidak ditemukan.'
    }
  } catch (err) {
    error.value = 'Terjadi kesalahan saat memuat video. Server mungkin tidak merespons.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
}

onMounted(() => {
  window.scrollTo(0, 0)
  fetchVideo()
})
</script>
