<template>
  <div class="form">
    <div class="form-group">
      <label>회사명</label>
      <input v-model="localForm.companyName" placeholder="예: SK바이오사이언스" />
    </div>

    <div class="form-group">
      <label>메인 컬러</label>
      <div class="color-row">
        <input type="color" v-model="localForm.mainColor" />
        <span>{{ localForm.mainColor }}</span>
      </div>
    </div>

    <div class="form-group">
      <label>산업군</label>
      <select v-model="localForm.industry">
        <option value="">선택해주세요</option>
        <option value="제조">제조</option>
        <option value="금융">금융</option>
        <option value="의료/바이오">의료/바이오</option>
        <option value="에너지">에너지</option>
        <option value="IT/소프트웨어">IT/소프트웨어</option>
        <option value="유통/커머스">유통/커머스</option>
        <option value="공공기관">공공기관</option>
      </select>
    </div>

    <div class="form-group">
      <label>UI 스타일 방향</label>
      <select v-model="localForm.uiStyle">
        <option value="">선택해주세요</option>
        <option value="신뢰감 있고 심플한 느낌">신뢰감 있고 심플한 느낌</option>
        <option value="모던하고 세련된 느낌">모던하고 세련된 느낌</option>
        <option value="친근하고 따뜻한 느낌">친근하고 따뜻한 느낌</option>
        <option value="전문적이고 고급스러운 느낌">전문적이고 고급스러운 느낌</option>
      </select>
    </div>

    <button @click="$emit('submit', localForm)" :disabled="isLoading || !isFormValid">
      {{ isLoading ? 'AI 분석 중...' : 'UI 스타일 추천받기' }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: Boolean
  },
  emits: ['submit'],
  data() {
    return {
      localForm: {
        companyName: '',
        mainColor: '#000000',
        industry: '',
        uiStyle: ''
      }
    }
  },
  computed: {
    isFormValid() {
      return this.localForm.companyName && this.localForm.industry && this.localForm.uiStyle
    }
  }
}
</script>