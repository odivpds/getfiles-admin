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
