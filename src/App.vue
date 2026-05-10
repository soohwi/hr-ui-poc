<template>
  <div class="container">
    <h1>HR UI 스타일 추천 시스템</h1>
    <p class="desc">고객사 브랜드 정보를 입력하면 AI가 UI 컬러 시스템을 추천합니다.</p>

    <BrandForm :isLoading="isLoading" @submit="handleSubmit" />

    <ColorResult v-if="colorData.length" :colorData="colorData" :reason="reason" />

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import BrandForm from './components/BrandForm.vue'
import ColorResult from './components/ColorResult.vue'
import { getColorRecommendation } from './services/gemini.js'

export default {
  components: { BrandForm, ColorResult },
  data() {
    return {
      colorData: [],
      reason: '',
      isLoading: false,
      error: ''
    }
  },
  methods: {
    async handleSubmit(form) {
      this.isLoading = true
      this.error = ''
      this.colorData = []
      this.reason = ''

      try {
        const result = await getColorRecommendation(form)
        this.colorData = result.colorData
        this.reason = result.reason
      } catch (e) {
        this.error = 'API 호출 중 오류가 발생했습니다.'
        console.error(e)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>