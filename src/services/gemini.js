import { GoogleGenAI } from '@google/genai'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export async function getColorRecommendation(form) {
  const ai = new GoogleGenAI({ apiKey: API_KEY })

  const prompt = `
    당신은 UI/UX 디자인 전문가입니다.
    아래 고객사 정보를 바탕으로 HR 플랫폼에 적합한 UI 컬러 시스템을 추천해주세요.

    [고객사 정보]
    - 회사명: ${form.companyName}
    - 메인 브랜드 컬러: ${form.mainColor}
    - 산업군: ${form.industry}
    - UI 스타일 방향: ${form.uiStyle}

    아래 형식으로 추천해주세요:

    **[추천 UI 컬러 시스템]**

    **Primary Button:** #색상코드
    **Hover Color:** #색상코드
    **Header Background:** #색상코드
    **Success Color:** #색상코드
    **Warning Color:** #색상코드
    **Error Color:** #색상코드
    **Text Primary:** #색상코드
    **Background:** #색상코드

    **[추천 이유]**
    산업군과 브랜드 특성을 고려한 추천 이유를 2~3문장으로 설명해주세요.
    `

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt
  })

  const text = response.text
  const lines = text.split('\n')
  const colorData = []
  let reasonStart = false
  const reasonLines = []

  lines.forEach(line => {
    const labelMatch = line.match(/\*\*(.+?)\*\*/)
    const colorMatch = line.match(/#[0-9A-Fa-f]{6}/)

    if (labelMatch && colorMatch) {
      const label = labelMatch[1].replace(':', '').trim()
      colorData.push({ label, color: colorMatch[0] })
    }
    if (line.includes('추천 이유')) {
      reasonStart = true
      return
    }
    if (reasonStart && line.trim()) {
      reasonLines.push(line.trim())
    }
  })

  return {
    colorData,
    reason: reasonLines.join(' ')
  }
}