<template>
  <div class="result">
    <h2>AI 추천 결과</h2>
    <div class="color-grid">
      <div v-for="item in colorData" :key="item.label" class="color-card">
        <div class="color-box" :style="{ backgroundColor: item.color }"></div>
        <div class="color-info">
          <span class="color-label">{{ item.label }}</span>
          <span class="color-hex">{{ item.color }}</span>
        </div>
      </div>
    </div>
    <div class="reason" v-if="reason">
      <h3>추천 이유</h3>
      <p>{{ reason }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    colorData: Array,
    reason: String
  }
}
</script>