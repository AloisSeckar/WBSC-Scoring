import cs from '@/assets/lang/cs.json'
import en from '@/assets/lang/en.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: { en, cs }
}))
