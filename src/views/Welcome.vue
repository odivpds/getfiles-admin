<template>
  <div class="min-h-screen bg-[#111622] text-gray-200 font-sans w-full absolute top-0 left-0">
    <!-- Navbar -->
    <nav class="flex items-center justify-between px-8 py-4 bg-[#111622] border-b border-gray-800">
      <div class="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
        </svg>
        <span class="text-xl font-bold text-white tracking-wide">GetFiles</span>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="flex flex-col items-center justify-center pt-20 md:pt-32 px-4 text-center">
      <h1 class="text-4xl md:text-6xl font-extrabold mb-4 md:mb-6 leading-tight">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Welcome to GetFiles</span>
      </h1>
      <p class="max-w-md md:max-w-2xl text-gray-400 text-base md:text-lg leading-relaxed mb-8 md:mb-10">
        Discover and stream the most engaging videos across the web in pristine quality. Experience seamless playback, lightning-fast servers, and a vast collection curated just for you.
      </p>
      
      <router-link to="/generator" class="bg-indigo-600 hover:bg-indigo-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold transition text-base md:text-lg shadow-[0_0_20px_rgba(79,70,229,0.6)] w-full sm:w-auto">
        Open Video Generator
      </router-link>
    </div>

    <!-- Why Choose Us Section -->
    <div class="mt-16 md:mt-32 px-4 md:px-8 max-w-6xl mx-auto pb-20">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-white mb-2">Why Choose Us</h2>
        <div class="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Card 1 -->
        <div class="bg-[#151c2a] border border-gray-800 p-8 rounded-xl shadow-lg hover:border-gray-700 transition">
          <div class="w-12 h-12 bg-indigo-900/50 rounded-lg flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-3">High Quality</h3>
          <p class="text-gray-400 text-sm">Experience your videos in the best possible resolution without buffering.</p>
        </div>

        <!-- Card 2 -->
        <div class="bg-[#151c2a] border border-gray-800 p-8 rounded-xl shadow-lg hover:border-gray-700 transition">
          <div class="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-3">Lightning Fast</h3>
          <p class="text-gray-400 text-sm">Our global CDN ensures rapid delivery of content wherever you are.</p>
        </div>

        <!-- Card 3 -->
        <div class="bg-[#151c2a] border border-gray-800 p-8 rounded-xl shadow-lg hover:border-gray-700 transition">
          <div class="w-12 h-12 bg-pink-900/50 rounded-lg flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-3">Easy Download</h3>
          <p class="text-gray-400 text-sm">Generate direct links instantly and download with a single click.</p>
        </div>
      </div>
    </div>

    <!-- Video Gallery Section -->
    <div class="px-4 md:px-8 max-w-7xl mx-auto pb-32">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-white mb-2">Video Gallery</h2>
        <div class="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
        <p class="text-gray-400 mt-4 text-sm">Total Video Server: {{ pagination.total_items }}</p>
      </div>

      <div v-if="loading" class="text-center text-gray-500 py-10">
        <svg class="animate-spin h-8 w-8 text-indigo-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Memuat video...
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <div v-for="video in videos" :key="video.id" @click="$router.push('/play/' + video.slug)" class="bg-[#151c2a] border border-gray-800 rounded-2xl overflow-hidden shadow-lg hover:border-gray-700 transition flex flex-col cursor-pointer group hover:shadow-indigo-500/10 hover:shadow-2xl hover:-translate-y-1 transform duration-300">
          <div class="relative w-full pt-[56.25%] bg-[#0a0d14] border-b border-gray-800"
               @mouseenter="hoveredVideo = video.id"
               @mouseleave="hoveredVideo = null">
            <!-- Static Thumbnail -->
            <img v-show="hoveredVideo !== video.id" 
                 :src="`https://vz-80a83061-403.b-cdn.net/${video.bunny_id}/thumbnail.jpg`" 
                 class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                 alt="Thumbnail" loading="lazy" />

            <!-- Hover Video (10s Teaser Loop) -->
            <video v-if="hoveredVideo === video.id"
                   :src="`https://vz-80a83061-403.b-cdn.net/${video.bunny_id}/play_240p.mp4`"
                   autoplay muted playsinline
                   class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                   @timeupdate="e => { if(e.target.currentTime >= 10) { e.target.currentTime = 0; e.target.play(); } }">
            </video>

            <!-- Play Icon Overlay -->
            <div class="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white/70 group-hover:text-indigo-400 group-hover:scale-110 transition-all drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <!-- Duration Badge Placeholder -->
            <div class="absolute bottom-2 right-2 bg-black/70 text-xs px-2 py-1 rounded font-mono text-gray-300">
              HD
            </div>
          </div>
          <div class="p-4 flex-grow flex flex-col justify-between">
            <h3 class="text-sm font-bold text-gray-200 group-hover:text-white mb-3 line-clamp-2 leading-snug" :title="video.title">{{ video.title }}</h3>
            <div class="flex items-center justify-between mt-auto">
              <p class="text-xs text-gray-500 font-medium">👀 {{ (video.views || 0).toLocaleString() }} views</p>
              <button class="text-sm bg-indigo-600/20 text-indigo-400 px-4 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity font-bold hover:bg-indigo-600 hover:text-white">Tonton</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div v-if="!loading && pagination.total_pages > 1" class="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button @click="prevPage" :disabled="pagination.current_page === 1" class="px-5 py-2.5 bg-[#151c2a] border border-gray-700 rounded-lg text-sm text-white disabled:opacity-50 hover:bg-gray-800 hover:border-gray-600 transition flex items-center shadow-lg w-full sm:w-auto justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
          Sebelumnya
        </button>
        
        <div class="text-sm text-gray-400 font-mono bg-[#0d131f] border border-gray-800 px-6 py-2.5 rounded-lg shadow-inner">
          Hal <span class="text-white font-bold">{{ pagination.current_page }}</span> dari <span class="text-white font-bold">{{ pagination.total_pages }}</span>
        </div>
        
        <button @click="nextPage" :disabled="pagination.current_page === pagination.total_pages" class="px-5 py-2.5 bg-[#151c2a] border border-gray-700 rounded-lg text-sm text-white disabled:opacity-50 hover:bg-gray-800 hover:border-gray-600 transition flex items-center shadow-lg w-full sm:w-auto justify-center">
          Selanjutnya
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.getfiles.my.id',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

const videos = ref([])
const hoveredVideo = ref(null)
const pagination = ref({ current_page: 1, total_pages: 1, total_items: 0 })
const loading = ref(true)

const fetchVideos = async (page = 1) => {
  loading.value = true
  try {
    const res = await api.get(`/videos?page=${page}&limit=10`)
    if (res.data.success) {
      videos.value = res.data.data
      pagination.value = res.data.pagination
      
      // Auto scroll ke gallery
      if (page > 1) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      }
    }
  } catch (error) {
    console.error('Error fetching videos:', error)
  } finally {
    loading.value = false
  }
}

const nextPage = () => {
  if (pagination.value.current_page < pagination.value.total_pages) {
    fetchVideos(pagination.value.current_page + 1)
  }
}

const prevPage = () => {
  if (pagination.value.current_page > 1) {
    fetchVideos(pagination.value.current_page - 1)
  }
}

onMounted(() => {
  fetchVideos()
})
</script>
