<template>
  <div class="w-full max-w-4xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-6 md:mb-8">
      <h1 class="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-2">Viral Video Generator</h1>
      <p class="text-xs md:text-sm text-gray-400">Mode Acak, Berurutan & Terhubung Langsung ke Bunny.net</p>
    </div>

    <!-- Main Card -->
    <div class="bg-[#151b28] border border-gray-700/50 rounded-xl p-4 md:p-6 shadow-2xl relative">
      <!-- Card Header -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-gray-700/50 pb-4 mb-6 gap-4 md:gap-0">
        <div class="flex items-center space-x-2 text-gray-200 w-full md:w-auto">
          <svg xmlns="http://www.w3.org/.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
          </svg>
          <h2 class="text-lg font-bold">Pengaturan</h2>
        </div>
        <button @click="syncBunny" :disabled="syncing" class="flex items-center justify-center space-x-2 bg-slate-700/50 hover:bg-slate-600 border border-slate-600 text-xs md:text-sm font-semibold text-gray-200 px-4 py-2 rounded-md transition disabled:opacity-50 w-full md:w-auto">
          <svg xmlns="http://www.w3.org/.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{{ syncing ? 'SYNCING...' : 'SYNC DARI BUNNY' }}</span>
        </button>
      </div>

      <!-- Form Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Domain Input -->
        <div class="space-y-2">
          <label class="block text-xs font-bold text-gray-400 tracking-wider uppercase">Domain (Tanpa https://)</label>
          <div class="relative">
            <input v-model="form.domain" type="text" placeholder="videxy.cam" class="w-full bg-[#0d131f] border border-gray-700 text-gray-200 text-sm rounded-md px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            <button v-if="form.domain" @click="form.domain = ''" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300">
              <svg xmlns="http://www.w3.org/.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Format Path -->
        <div class="space-y-2">
          <label class="block text-xs font-bold text-gray-400 tracking-wider uppercase">Format Path URL</label>
          <select v-model="form.pathFormat" class="w-full bg-[#0d131f] border border-gray-700 text-gray-200 text-sm rounded-md px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none">
            <option value="/?v=">Query Parameter (domain.com/?v=video-1) - AMAN UNTUK GITHUB</option>
            <option value="/#/">Hash Parameter (domain.com/#/video-1) - AMAN UNTUK GITHUB</option>
            <option value="/video/">Path /video/ (Bukan untuk Github)</option>
            <option value="/amplify_video/">Path /amplify_video/ (Bukan untuk Github)</option>
          </select>
        </div>

        <!-- Format Model Posting -->
        <div class="space-y-2">
          <label class="block text-xs font-bold text-gray-400 tracking-wider uppercase">Format Model Posting</label>
          <select v-model="form.postModel" class="w-full bg-[#0d131f] border border-gray-700 text-gray-200 text-sm rounded-md px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none">
            <option value="model1">Model 1 (Hanya Banyak Link Baris Baru)</option>
            <option value="model2">Model 2 (Judul Video + Link Baris Baru)</option>
            <option value="model3">Model 3 (HTML Format &lt;a href="..."&gt;)</option>
          </select>
        </div>

        <!-- Jumlah Generate -->
        <div class="space-y-2">
          <label class="block text-xs font-bold text-gray-400 tracking-wider uppercase">Jumlah Generate</label>
          <div class="flex items-center space-x-4 h-[42px]">
            <input v-model="form.count" type="range" min="1" max="100" class="flex-grow h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500">
            <div class="bg-[#0d131f] border border-gray-700 px-3 py-1.5 rounded-md text-sm w-16 text-center font-mono">
              {{ form.count }}
            </div>
          </div>
        </div>
      </div>

      <!-- Metode Ambil Video -->
      <div class="space-y-2 mb-8">
        <label class="block text-[10px] md:text-xs font-bold text-gray-400 tracking-wider uppercase">Metode Ambil Video</label>
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 bg-[#0d131f] border border-gray-700 p-3 rounded-md">
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" v-model="form.method" value="acak" class="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-offset-gray-800">
            <span class="text-xs md:text-sm">Acak</span>
          </label>
          <label class="flex items-center space-x-2 cursor-pointer">
            <input type="radio" v-model="form.method" value="berurutan" class="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500 focus:ring-offset-gray-800">
            <span class="text-xs md:text-sm">Berurutan Terbaru</span>
          </label>
          <span class="text-[10px] md:text-xs text-gray-500 sm:ml-auto w-full sm:w-auto text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-700">Database Server: {{ videos.length }} Video</span>
        </div>
      </div>

      <!-- Generate Button -->
      <div class="flex justify-center -mb-10 md:-mb-12 relative z-10">
        <button @click="generateLinks" class="flex items-center justify-center space-x-2 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 border border-slate-500 shadow-xl px-6 md:px-8 py-3 rounded-full text-white text-sm md:text-base font-bold tracking-wide transition-all transform hover:scale-105 w-11/12 md:w-auto">
          <svg xmlns="http://www.w3.org/.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
          </svg>
          <span>GENERATE LINK VIRAL</span>
        </button>
      </div>
    </div>

    <!-- Output Box (Muncul Jika Ada Hasil) -->
    <div v-if="generatedText" class="mt-14 md:mt-16 bg-[#151b28] border border-gray-700/50 rounded-xl p-4 md:p-6 shadow-2xl relative">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-bold text-gray-300">Hasil Generate ({{ form.count }} Link)</h3>
        <button @click="copyToClipboard" :class="copyBtnText === 'Copy All' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-600 hover:bg-green-500'" class="text-xs text-white px-3 py-1 rounded transition min-w-[80px] text-center">{{ copyBtnText }}</button>
      </div>
      <textarea v-model="generatedText" readonly rows="10" class="w-full bg-[#0d131f] border border-gray-700 text-gray-300 text-sm font-mono rounded-md p-4 focus:outline-none scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"></textarea>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.getfiles.my.id',
  // baseURL: 'http://localhost/getfiles-api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// States
const videos = ref([])
const syncing = ref(false)
const generatedText = ref('')
const copyBtnText = ref('Copy All')

const form = ref({
  domain: 'domain_anda.com',
  pathFormat: '/?v=',
  postModel: 'model2',
  count: 5,
  method: 'acak'
})

// Ambil semua video dari backend
const fetchVideos = async () => {
  try {
    const res = await api.get('/generator')
    if (res.data.success) {
      videos.value = res.data.data
    }
  } catch (error) {
    console.error('Error fetching videos:', error)
  }
}

// Sync dari Bunny
const syncBunny = async () => {
  syncing.value = true
  try {
    const res = await api.post('/sync-bunny')
    alert(res.data.message)
    await fetchVideos()
  } catch (error) {
    alert('Failed to sync. Server error or API not reachable.')
  } finally {
    syncing.value = false
  }
}

// Proses pembuatan teks link (Frontend Only)
const generateLinks = () => {
  if (videos.value.length === 0) {
    alert('Database kosong! Klik SYNC DARI BUNNY terlebih dahulu.')
    return
  }

  // Clone array agar tidak mengubah aslinya
  let pool = [...videos.value]

  // Acak atau Berurutan
  if (form.value.method === 'acak') {
    pool = pool.sort(() => 0.5 - Math.random())
  } else {
    // Asumsi berurutan terbaru (sudah terbaru dari backend orderBy DESC)
  }

  // Potong array sesuai jumlah yang diminta
  const selected = pool.slice(0, form.value.count)

  let result = ''
  const domain = form.value.domain.replace(/^https?:\/\//, '').replace(/\/$/, '')

  selected.forEach(vid => {
    // Susun URL
    const url = `https://${domain}${form.value.pathFormat}${vid.slug}`

    // Susun Format Teks
    if (form.value.postModel === 'model1') {
      result += `${url}\n`
    } else if (form.value.postModel === 'model2') {
      result += `${vid.title}\n${url}\n\n`
    } else if (form.value.postModel === 'model3') {
      result += `<p>${vid.title}<br><a href="${url}">${url}</a></p>\n`
    }
  })

  generatedText.value = result.trim()
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(generatedText.value)
    .then(() => {
      copyBtnText.value = 'Tercopy! ✅'
      setTimeout(() => {
        copyBtnText.value = 'Copy All'
      }, 2000)
    })
    .catch(err => console.error('Gagal copy: ', err))
}

onMounted(() => {
  fetchVideos()
})
</script>
